from urllib.parse import parse_qs

from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import close_old_connections

from channels.auth import AuthMiddlewareStack
from channels.db import database_sync_to_async
from jwt import InvalidSignatureError, ExpiredSignatureError, DecodeError
from jwt import decode as jwt_decode


class JWTAuthMiddleware:
    """Middleware to authenticate user for channels"""

    def __init__(self, app):
        """Initializing the app."""
        self.app = app

    async def __call__(self, scope, receive, send):
        """Authenticate the user based on jwt."""

        close_old_connections()
        try:
            token = parse_qs(scope["query_string"].decode("utf8")).get('token', None)[0]
            data = jwt_decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            scope['user'] = await self.get_user(data['user_id'])
        except (TypeError, KeyError, InvalidSignatureError, ExpiredSignatureError, DecodeError) as e:
            await send({
                "type": "websocket.close"
            })
            return

        return await self.app(scope, receive, send)

    @database_sync_to_async
    def get_user(self, user_id):
        """Return the user based on user id."""
        User = get_user_model()
        try:
            user = User.objects.get(id=user_id)
            if not user.is_active:
                raise InvalidSignatureError("User inactive")
            return user
        except User.DoesNotExist:
            raise InvalidSignatureError*("User Doesnt exist.")


def JWTAuthMiddlewareStack(app):
    """This function wrap channels authentication stack with JWTAuthMiddleware."""
    return JWTAuthMiddleware(AuthMiddlewareStack(app))
