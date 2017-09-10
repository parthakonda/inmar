from django.conf.urls import include, url
from services.views import SearchAddView, request_import_data

urlpatterns = [
    url(r'^request_import_data/(?P<dispatch>[\w-]+)/$',
        SearchAddView.as_view(template="request_import_data.html")),   
    url(r'^task/$', request_import_data)  
]
