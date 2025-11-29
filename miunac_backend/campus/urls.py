from rest_framework.routers import DefaultRouter

from .views import (
    CampusPlaceViewSet,
    InventoryItemViewSet,
    LiveStatusViewSet,
    StudentProfileViewSet,
)

router = DefaultRouter()
router.register("profiles", StudentProfileViewSet)
router.register("places", CampusPlaceViewSet)
router.register("items", InventoryItemViewSet)
router.register("statuses", LiveStatusViewSet)

urlpatterns = router.urls
