from django.conf.urls import include, url
from services.views import SearchAddView, request_import_data, dump_data, show_infographic

urlpatterns = [
    url(r'^request_import_data/(?P<dispatch>[\w-]+)/$',
        SearchAddView.as_view(template="services/request_import_data.html")),
    url(r'^search_stock/(?P<dispatch>[\w-]+)/$',
        SearchAddView.as_view(template="services/search_stock.html")),
    url(r'^show_infographic/(?P<dispatch>[\w-]+)/$',
        SearchAddView.as_view(template="services/show_infographic.html")),
    url(r'^flush/(?P<dispatch>[\w-]+)/$',
        SearchAddView.as_view(template="authentication/flush.html")),
    url(r'^task/$', request_import_data),
    url(r'^dump_data/$', dump_data),      
]
