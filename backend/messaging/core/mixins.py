from django.conf import settings
from django.contrib.auth.models import AnonymousUser

from channels.db import database_sync_to_async

from jwt import InvalidSignatureError, ExpiredSignatureError, DecodeError
from jwt import decode as jwt_decode


class TokenValidationMixin:
    """Mixin to validate JWT token in WebSocket consumers."""

    async def is_token_valid(self):
        """Check if the token is valid."""
        try:
            token = self.scope["query_string"].decode("utf8").split("token=")[-1]
            data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            return True
        except (TypeError, KeyError, InvalidSignatureError, ExpiredSignatureError, DecodeError) as e:
            print(f"JWT decode error: {e.__class__} :: {e}")
            self.scope['user'] = AnonymousUser()
            return False

    @database_sync_to_async
    def get_user(self, user_id):
        """Return the user based on user ID."""
        try:
            from django.contrib.auth import get_user_model
            User = get_user_model()
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return AnonymousUser()