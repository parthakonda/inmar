from rest_framework import serializers
from rest_framework_nested.serializers import NestedHyperlinkedModelSerializer

from services.models import (
    SKU,
    Category,
    Department,
    Location,
    SubCategory
)

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = "__all__"
        # depth = 1

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = "__all__"
        

class SKUSerializer(serializers.ModelSerializer):
    class Meta:
        model = SKU
        fields = "__all__"
        
class SKUListSerializer(serializers.ModelSerializer):
    class Meta:
        model = SKU
        fields = ['id', 'stock_id', 'name', 'subcategory_name','subcategory_name', 'category_name', 'department_name', 'location_name']