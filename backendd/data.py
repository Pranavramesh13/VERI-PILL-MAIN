import roboflow
from roboflow import Roboflow
import cv2
import os

# Authenticate and initialize
rf = Roboflow(api_key="YOUR_ROBOFLOW_API_KEY")  # Get key from Roboflow dashboard
project = rf.workspace("YOUR_WORKSPACE").project("YOUR_PROJECT_ID")
model = project.version("YOUR_VERSION_NUMBER").model

# Path to the attached image
image_path = "image.jpg"  # Ensure this file is in your script's directory

# Load and run inference
results = model.predict(image_path, confidence=0.5, overlap=0.5).json()

# Visualize predictions with OpenCV
frame = cv2.imread(image_path)
for prediction in results['predictions']:
    x = int(prediction['x'])
    y = int(prediction['y'])
    width = int(prediction['width'])
    height = int(prediction['height'])
    x0 = x - width // 2
    y0 = y - height // 2
    x1 = x + width // 2
    y1 = y + height // 2
    cv2.rectangle(frame, (x0, y0), (x1, y1), (0, 255, 0), 2)
    cv2.putText(frame, prediction['class'], (x0, y0-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

# Display or save the annotated image
cv2.imshow('Prediction', frame)
cv2.waitKey(0)
cv2.destroyAllWindows()
print(results)  # Outputs detections like class, confidence, bounding box
