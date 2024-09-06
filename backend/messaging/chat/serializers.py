from typing import Any, Dict
from rest_framework.serializers import ModelSerializer

from django.contrib.auth.models import User

from .models import ChatMessages

from rest_framework_simplejwt.serializers import TokenRefreshSerializer as TknRefSerializer
from rest_framework_simplejwt.serializers import TokenVerifySerializer as TknVerifySerializer
from rest_framework_simplejwt.serializers import TokenBlacklistSerializer as TknBlackListSerializer

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError



class TokenBlacklistSerializer(TknBlackListSerializer):
    """Custom TokeBlackListSerializer to validate the existence of user"""

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        token = RefreshToken(attrs["refresh"])
        user_id = token['user_id']
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise TokenError("User Doesnt Exist")
        if not user.is_active:
            raise TokenError("User Inactive")
        return super().validate(attrs)


class TokenRefreshSerializer(TknRefSerializer):
    """Custom TokenRefreshSerializer to validate the existence of user"""

    def validate(self, attrs: Dict[str, Any]) -> Dict[str, str]:
        token = RefreshToken(attrs["refresh"])
        user_id = token['user_id']
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise TokenError("User Doesnt Exists")
        if not user.is_active:
            raise TokenError("User Inactive")
        return super().validate(attrs)


class TokenVerifySerializer(TknVerifySerializer):
    """Custom TokenVerifySerializer to validate the existence of user"""

    def validate(self, attrs: Dict[str, None]) -> Dict[Any, Any]:
        token = AccessToken(attrs["token"])
        user_id = token['user_id']
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise TokenError("User Doesnt Exists")
        if not user.is_active:
            raise TokenError("User Inactive")
        return super().validate(attrs)


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
