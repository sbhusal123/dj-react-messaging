from rest_framework.serializers import ModelSerializer

from django.contrib.auth.models import User

from .models import ChatMessages


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True},
            'id': {'read_only': True}
        }
    
    def create(self, validated_data):
        instance =  super().create(validated_data)
        instance.set_password(validated_data['password'])
        instance.is_active = True
        instance.save()
        return instance


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

    def create(self, validated_data):
        instance =  super().create(validated_data)
        self.broadcast_message_to_channel(instance)
        return instance

    def to_representation(self, instance):
        data =  super().to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data
