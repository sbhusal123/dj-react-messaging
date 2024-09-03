from django.db import models

from django.contrib.auth.models import User

class ChatRoom(models.Model):
    """Users Online in a room"""

    room_name = models.TextField(null=False, blank=False)
    users = models.ManyToManyField(User, null=True, blank=True)


class ChatMessages(models.Model):
    """Chat messags from users"""

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField(null=False, blank=False)
    timestamp = models.DateTimeField(auto_now_add=True)
