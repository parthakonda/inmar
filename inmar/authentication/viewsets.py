
from django.contrib.auth.models import User
from authentication.serializers import UserSerializer
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import make_password

class UserViewSet(viewsets.ModelViewSet):
    
    queryset = User.objects.all()
    serializer_class = UserSerializer
    page_size = 100
    page_size_query_param = 'page_size'
    
    def create(self, request, format=None):
        request.data.update({'password': make_password(request.data['password'])})
        return super(UserViewSet, self).create(request)
