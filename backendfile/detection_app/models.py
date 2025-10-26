from django.db import models
from django.utils import timezone

class ImageUpload(models.Model):
    image = models.ImageField(upload_to='uploads/')
    uploaded_at = models.DateTimeField(default=timezone.now)
    prediction_result = models.JSONField(null=True, blank=True)  # Store Roboflow JSON

    def __str__(self):
        return f"Upload {self.id} at {self.uploaded_at}"
