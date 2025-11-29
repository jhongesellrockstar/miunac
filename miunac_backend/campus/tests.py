from datetime import timedelta

from django.contrib.auth.models import User
from django.contrib.gis.geos import Point
from django.test import TestCase
from django.utils import timezone
from rest_framework.test import APIClient

from .models import CampusPlace, LiveStatus, StudentProfile


class CampusAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="pass")
        self.profile = StudentProfile.objects.create(
            user=self.user,
            nickname="Tester",
            bio="",
            avatar_sprite="sprite.png",
            skills="coding",
            interests="geo",
        )

    def test_create_campus_place_with_point(self):
        place = CampusPlace.objects.create(
            name="Library",
            description="Main library",
            kind=CampusPlace.PlaceKind.BUILDING,
            location=Point(-74.0, 4.0),
            is_active=True,
        )
        self.assertEqual(place.name, "Library")
        self.assertIsInstance(place.location, Point)

    def test_get_places_endpoint(self):
        CampusPlace.objects.create(
            name="Lab",
            description="Computer lab",
            kind=CampusPlace.PlaceKind.LAB,
            location=Point(-74.1, 4.1),
            is_active=True,
        )
        response = self.client.get("/api/campus/places/")
        self.assertEqual(response.status_code, 200)
        self.assertGreaterEqual(len(response.json()), 1)

    def test_nearby_statuses_endpoint(self):
        LiveStatus.objects.create(
            profile=self.profile,
            message="Here",
            location=Point(-74.0, 4.0),
            visibility=LiveStatus.Visibility.PUBLIC,
            is_active=True,
            expires_at=timezone.now() + timedelta(hours=1),
        )

        response = self.client.get(
            "/api/campus/statuses/nearby/",
            {"lat": 4.0, "lon": -74.0, "radius": 500},
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertGreaterEqual(len(data), 1)

# Create your tests here.
