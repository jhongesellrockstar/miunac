# Generated manually for initial GeoDjango models
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.contrib.gis.db.models.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="StudentProfile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("nickname", models.CharField(max_length=150)),
                ("bio", models.TextField(blank=True)),
                ("avatar_sprite", models.CharField(max_length=255)),
                ("skills", models.CharField(max_length=255)),
                ("interests", models.CharField(max_length=255)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "user",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="profile",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="CampusPlace",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("description", models.TextField(blank=True)),
                (
                    "kind",
                    models.CharField(
                        choices=[
                            ("building", "Building"),
                            ("classroom", "Classroom"),
                            ("lab", "Laboratory"),
                            ("green", "Green area"),
                            ("service", "Service"),
                        ],
                        max_length=50,
                    ),
                ),
                (
                    "location",
                    django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326),
                ),
                (
                    "boundary",
                    django.contrib.gis.db.models.fields.PolygonField(blank=True, null=True, srid=4326),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name="LiveStatus",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("message", models.CharField(max_length=255)),
                (
                    "location",
                    django.contrib.gis.db.models.fields.PointField(geography=True, srid=4326),
                ),
                (
                    "visibility",
                    models.CharField(
                        choices=[("public", "Public"), ("friends", "Friends"), ("private", "Private")],
                        max_length=20,
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("expires_at", models.DateTimeField()),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "profile",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="statuses",
                        to="campus.studentprofile",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="InventoryItem",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=200)),
                ("category", models.CharField(max_length=150)),
                ("description", models.TextField(blank=True)),
                ("is_available", models.BooleanField(default=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="items",
                        to="campus.studentprofile",
                    ),
                ),
            ],
        ),
    ]
