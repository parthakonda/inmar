from django.conf.urls import url, include
from services.views import home
from services import routes as stock_routes
from services import urls as stock_urls
from authentication import urls as auth_urls

urlpatterns = [
    url(r'^$', home),
    url(r'^api/v1/', include(stock_routes)),
    url(r'^stock/', include(stock_urls)),
    url(r'^', include(auth_urls)),                
]
