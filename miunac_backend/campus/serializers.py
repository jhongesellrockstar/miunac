from rest_framework import serializers
from rest_framework_gis.serializers import GeoModelSerializer

from .models import CampusPlace, InventoryItem, LiveStatus, StudentProfile


class StudentProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentProfile
        fields = "__all__"


class CampusPlaceSerializer(GeoModelSerializer):
    class Meta:
        model = CampusPlace
        fields = "__all__"


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = "__all__"


class LiveStatusSerializer(GeoModelSerializer):
    nickname = serializers.SerializerMethodField()

    class Meta:
        model = LiveStatus
        fields = "__all__"

    def get_nickname(self, obj):
        return obj.profile.nickname
