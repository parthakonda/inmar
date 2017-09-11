from django.conf.urls import include, url
from rest_framework_nested import routers
from services.viewsets import (CategoryViewSet, DepartmentViewSet,
                               LocationViewSet, SKUViewSet, SubCategoryViewSet,
                               SKUApiView, FlushApiView)
from services.views import SearchAddView
# Location
router = routers.SimpleRouter()
router.register(r'location', LocationViewSet)

# Department
department_router = routers.NestedSimpleRouter(
    router, r'location', lookup='location')
department_router.register(r'department', DepartmentViewSet,
                        base_name='department')

# Category
category_router = routers.NestedSimpleRouter(
    department_router, r'department', lookup='department')
category_router.register(r'category', CategoryViewSet,
                        base_name='category')

# SubCategory
sub_category_router = routers.NestedSimpleRouter(
    category_router, r'category', lookup='category')
sub_category_router.register(r'subcategory', SubCategoryViewSet,
                        base_name='subcategory')

# SKU
sku_router = routers.NestedSimpleRouter(
    sub_category_router, r'subcategory', lookup='subcategory')
sku_router.register(r'sku', SKUViewSet,
                        base_name='sku')

urlpatterns = [
    url(r'', include(router.urls)),
    url(r'', include(department_router.urls)),
    url(r'', include(category_router.urls)),
    url(r'', include(sub_category_router.urls)),    
    url(r'', include(sku_router.urls)),
    url(r'sku_search/$', SKUApiView.as_view()), 
    url(r'flush/$', FlushApiView.as_view()),           
]
