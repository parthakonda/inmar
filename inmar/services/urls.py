from django.conf.urls import include, url
from services.views import SearchAddView, request_import_data, dump_data, show_infographic

urlpatterns = [
    url(r'^request_import_data/(?P<dispatch>[\w-]+)/$',
        SearchAddView.as_view(template="request_import_data.html")),   
    url(r'^task/$', request_import_data),
    url(r'^dump_data/$', dump_data),
    url(r'^show_infographic/view/$', show_infographic),          
]
