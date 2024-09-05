from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta

from rest_framework import viewsets

from .serializers import ChatMessageSerializer, RegisterSerializer

from .models import ChatMessages

from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwnerOrReadOnly

from core.pagination import ChatMessagePagination

class RememberMeTokenView(TokenObtainPairView):

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        remember_me = request.data.get('remember_me', False)
        
        if remember_me:
            refresh_token = response.data.get('refresh')
            if refresh_token:
                refresh = RefreshToken(refresh_token)
                
                refresh.set_exp(lifetime=timedelta(days=7))
                
                response.data['refresh'] = str(refresh)
        return response


from rest_framework.viewsets import GenericViewSet
from rest_framework.mixins import CreateModelMixin

from django.contrib.auth.models import User

class RegisterViewSet(CreateModelMixin, GenericViewSet):
    serializer_class = RegisterSerializer
    queryset = User.objects.all()


class ChatMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer

    queryset = ChatMessages.objects.order_by('timestamp')

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]

    pagination_class = ChatMessagePagination

    def get_queryset(self):
        search_string = self.request.GET.get('message', None)
        if search_string or search_string == '':
            
            qs = ChatMessages.objects.filter(message__icontains=search_string)
            return qs
        return super().get_queryset()


    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
