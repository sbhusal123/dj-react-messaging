from rest_framework.routers import DefaultRouter

from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView
)

from .views import RememberMeTokenView

router = DefaultRouter()
# router.register('/api', views.)

urlpatterns = [
    path('api/token/', RememberMeTokenView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('api/logout/', TokenBlacklistView.as_view(), name='token_blacklist'),

    path('', include(router.urls))
]
