from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
