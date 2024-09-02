from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
from datetime import timedelta

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
