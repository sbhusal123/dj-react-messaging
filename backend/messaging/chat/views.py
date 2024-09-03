from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import timedelta

from rest_framework import mixins
from rest_framework import viewsets

from .serializers import ChatMessageSerializer

from .models import ChatMessages

from rest_framework_simplejwt.authentication import JWTAuthentication

from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwnerOrReadOnly

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


class ChatMessageViewSet(viewsets.ModelViewSet):
    serializer_class = ChatMessageSerializer

    queryset = ChatMessages.objects.all()

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrReadOnly]


    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
