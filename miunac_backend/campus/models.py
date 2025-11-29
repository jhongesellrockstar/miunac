from django.contrib.auth.models import User
from django.contrib.gis.db import models


class StudentProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    nickname = models.CharField(max_length=150)
    bio = models.TextField(blank=True)
    avatar_sprite = models.CharField(max_length=255)
    skills = models.CharField(max_length=255)
    interests = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.nickname


class CampusPlace(models.Model):
    class PlaceKind(models.TextChoices):
        BUILDING = "building", "Building"
        CLASSROOM = "classroom", "Classroom"
        LAB = "lab", "Laboratory"
        GREEN = "green", "Green area"
        SERVICE = "service", "Service"

    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    kind = models.CharField(max_length=50, choices=PlaceKind.choices)
    location = models.PointField(geography=True)
    boundary = models.PolygonField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.name


class InventoryItem(models.Model):
    owner = models.ForeignKey(
        StudentProfile, on_delete=models.CASCADE, related_name="items"
    )
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.name} ({self.owner.nickname})"


class LiveStatus(models.Model):
    class Visibility(models.TextChoices):
        PUBLIC = "public", "Public"
        FRIENDS = "friends", "Friends"
        PRIVATE = "private", "Private"

    profile = models.ForeignKey(
        StudentProfile, on_delete=models.CASCADE, related_name="statuses"
    )
    message = models.CharField(max_length=255)
    location = models.PointField(geography=True)
    visibility = models.CharField(max_length=20, choices=Visibility.choices)
    is_active = models.BooleanField(default=True)
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.profile.nickname}: {self.message}"
