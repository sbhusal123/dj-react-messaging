# chat/routing.py
from django.urls import path

from chat.consumer import ChatConsumer

# wss://
websocket_urlpatterns = [
    path('ws/chat/', ChatConsumer.as_asgi())
]
