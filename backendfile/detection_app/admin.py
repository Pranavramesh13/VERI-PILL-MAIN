from django.contrib import admin
from .models import ImageUpload  # If using models

@admin.register(ImageUpload)
class ImageUploadAdmin(admin.ModelAdmin):
    list_display = ['id', 'image', 'uploaded_at', 'prediction_result']
    readonly_fields = ['uploaded_at']
