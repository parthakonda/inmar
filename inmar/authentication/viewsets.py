
from django.contrib.auth.models import User
from authentication.serializers import UserSerializer
from rest_framework import status, viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.views import APIView


class UserViewSet(viewsets.ModelViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer