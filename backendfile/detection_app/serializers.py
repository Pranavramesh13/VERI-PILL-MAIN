# backend/detection_app/serializers.py

from rest_framework import serializers

class PredictionDetailSerializer(serializers.Serializer):
    x = serializers.FloatField()
    y = serializers.FloatField()
    width = serializers.FloatField()
    height = serializers.FloatField()
    class_name = serializers.CharField(source='class', required=False) # Roboflow uses 'class', which is a Python keyword
    confidence = serializers.FloatField()


class ImageDetailSerializer(serializers.Serializer):
    width = serializers.IntegerField()
    height = serializers.IntegerField()


class ImageInferenceSerializer(serializers.Serializer):
    predictions = PredictionDetailSerializer(many=True) # Many because there can be multiple predictions
    image = ImageDetailSerializer() # Nested serializer for image details