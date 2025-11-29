from django.contrib.gis.geos import Point
from django.contrib.gis.measure import D
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import CampusPlace, InventoryItem, LiveStatus, StudentProfile
from .serializers import (
    CampusPlaceSerializer,
    InventoryItemSerializer,
    LiveStatusSerializer,
    StudentProfileSerializer,
)


class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer


class CampusPlaceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CampusPlace.objects.all()
    serializer_class = CampusPlaceSerializer


class InventoryItemViewSet(viewsets.ModelViewSet):
    queryset = InventoryItem.objects.select_related("owner").all()
    serializer_class = InventoryItemSerializer


class LiveStatusViewSet(viewsets.ModelViewSet):
    queryset = LiveStatus.objects.select_related("profile").all()
    serializer_class = LiveStatusSerializer

    @action(detail=False, methods=["get"])
    def nearby(self, request):
        try:
            lat = float(request.query_params.get("lat"))
            lon = float(request.query_params.get("lon"))
            radius = float(request.query_params.get("radius", 100))
        except (TypeError, ValueError):
            return Response(
                {"detail": "lat, lon y radius deben ser numéricos"}, status=400
            )

        point = Point(lon, lat)
        now = timezone.now()
        statuses = (
            self.get_queryset()
            .filter(is_active=True, expires_at__gt=now, location__distance_lte=(point, D(m=radius)))
            .order_by("-created_at")
        )
        serializer = self.get_serializer(statuses, many=True)
        return Response(serializer.data)
