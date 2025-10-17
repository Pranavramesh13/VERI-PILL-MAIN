# backend/detection_app/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import status
from django.http import JsonResponse
import requests # Still needed for potential external API calls, but not direct Roboflow now
from django.conf import settings

# Import your Roboflow inference utility
from .utils.roboflow_inference import get_roboflow_inference

# Import your ImageUpload model (if you're using it)
# from .models import ImageUpload

# Import your serializer
from .serializers import ImageInferenceSerializer # Assuming this is your main response serializer

# No longer need API_URL here directly for Roboflow SDK usage

@api_view(['POST'])
@permission_classes([AllowAny])
def predict_medicine(request):
    if 'image' not in request.FILES:
        return JsonResponse({'error': 'No image provided.'}, status=status.HTTP_400_BAD_REQUEST)

    image_file = request.FILES['image']
    if not image_file.name.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
        return JsonResponse({'error': 'Invalid file type. Supported: JPG, PNG, GIF.'}, status=status.HTTP_400_BAD_REQUEST)

    if image_file.size > 10 * 1024 * 1024:  # 10MB limit
        return JsonResponse({'error': 'Image too large. Max 10MB.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        # Read the image file into bytes
        image_bytes = image_file.read()

        # Call the Roboflow inference utility
        inference_results = get_roboflow_inference(image_bytes)

        if "error" in inference_results:
            # Handle errors returned by the inference utility
            return JsonResponse(inference_results, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Optional: Log to database
        # Make sure ImageUpload model is correctly defined and handles JSONField for prediction_result
        # upload_log = ImageUpload.objects.create(
        #     image=image_file, # Note: if saving 'image_file', you might need to handle storage settings
        #     prediction_result=inference_results
        # )

        # Serialize the results before returning
        # Assuming ImageInferenceSerializer is designed to handle the full Roboflow JSON response
        serializer = ImageInferenceSerializer(data=inference_results)
        if serializer.is_valid():
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        else:
            print(f"Serializer errors: {serializer.errors}") # For debugging
            return JsonResponse({'error': 'Failed to serialize prediction results.', 'details': serializer.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
        print(f"Unexpected error in predict_medicine view: {e}")
        return JsonResponse({'error': f'Unexpected server error: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)