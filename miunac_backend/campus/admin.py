from django.contrib import admin

from .models import CampusPlace, InventoryItem, LiveStatus, StudentProfile


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "nickname", "user")


@admin.register(CampusPlace)
class CampusPlaceAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "kind", "is_active")


@admin.register(InventoryItem)
class InventoryItemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "owner", "is_available")


@admin.register(LiveStatus)
class LiveStatusAdmin(admin.ModelAdmin):
    list_display = ("id", "profile", "message", "visibility", "is_active")
