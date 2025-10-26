import os
from django.conf import settings
from roboflow import Roboflow
import numpy as np
import cv2

# --- Initialize Roboflow Model Globally (or as a singleton) ---
# This ensures the model is loaded once when the app starts, not on every request.
# Access environment variables from settings
ROBOFLOW_API_KEY = settings.ROBOFLOW_API_KEY
ROBOFLOW_WORKSPACE = settings.ROBOFLOW_WORKSPACE
ROBOFLOW_PROJECT_ID = settings.ROBOFLOW_PROJECT_ID
ROBOFLOW_VERSION = int(settings.ROBOFLOW_VERSION) # Ensure version is an integer

rf = None
project = None
model = None

try:
    rf = Roboflow(api_key=ROBOFLOW_API_KEY)
    project = rf.workspace(ROBOFLOW_WORKSPACE).project(ROBOFLOW_PROJECT_ID)
    model = project.version(ROBOFLOW_VERSION).model
    print("Roboflow model loaded successfully!") # For debugging
except Exception as e:
    print(f"Error loading Roboflow model: {e}")
    # Consider raising an exception or logging this more robustly
    # so you know if the model failed to load at startup.


def get_roboflow_inference(image_bytes, confidence_threshold=40, overlap_threshold=30):
    """
    Performs inference using the pre-loaded Roboflow model.

    Args:
        image_bytes: Raw bytes of the image file.
        confidence_threshold: Minimum confidence for detections.
        overlap_threshold: IOU threshold for NMS.

    Returns:
        A dictionary containing prediction results from Roboflow.
        Or None if the model failed to load.
    """
    if model is None:
        print("Roboflow model not initialized. Cannot perform inference.")
        return {"error": "Roboflow model not initialized on server."}

    try:
        # Convert bytes to numpy array for cv2
        np_arr = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            raise ValueError("Failed to decode image from bytes")

        # Now call predict with the numpy array
        results = model.predict(
            img,
            confidence=confidence_threshold,
            overlap=overlap_threshold
        ).json()
        return results
    except Exception as e:
        print(f"Error during Roboflow inference: {e}")
        return {"error": f"Roboflow inference failed: {str(e)}"}