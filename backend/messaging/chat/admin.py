from django.contrib import admin

from .models import ChatMessages, ChatRoom


admin.site.register(ChatMessages)
admin.site.register(ChatRoom)

