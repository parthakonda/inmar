# Author : Partha
from django.conf.urls import url, include
from rest_framework_nested import routers

from services.views import SearchAddView
from .views import user_login, user_register, user_logout
from .viewsets import UserViewSet

router = routers.SimpleRouter()
router.register(r'user', UserViewSet)

urlpatterns = [
    url(r'^auth/login/$', user_login),
    url(r'^auth/register/$', user_register),  
    url(r'^auth/logout/$', user_logout),
    url(r'^auth/user/(?P<dispatch>[\w-]+)/$',
        SearchAddView.as_view(template="authentication/users.html")),
    url(r'^api/v1/', include(router.urls)),    
]
