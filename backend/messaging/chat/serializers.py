from rest_framework.serializers import ModelSerializer

from django.contrib.auth.models import User

from .models import ChatMessages

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync


import json

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email']



class ChatMessageSerializer(ModelSerializer):

    class Meta:
        model = ChatMessages
        fields = ['message', 'user', 'id', 'timestamp']
        extra_kwargs = {
            'user': {'read_only': True}
        }

    def broadcast_message_to_channel(self, instance):
        message_data = {
            'id': instance.id,
            'message': instance.message,
            'timestamp': instance.timestamp.isoformat(),
            'user': {
                'username': instance.user.username,
                'email': instance.user.email,
                'id': instance.user.id
            }
        }

        async_to_sync(get_channel_layer().group_send)("chat_room",{
            'type': 'chat_message',
            'text': json.dumps({
                "type": "chat_message",
                "data": message_data
            })
        })

    def create(self, validated_data):
        instance =  super().create(validated_data)
        self.broadcast_message_to_channel(instance)
        return instance

    def to_representation(self, instance):
        data =  super().to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data
