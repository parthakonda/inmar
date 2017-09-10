from rest_framework import status, viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.views import APIView
from services.models import SKU, Category, Department, Location, SubCategory
from services.serializers import (CategorySerializer, DepartmentSerializer,
                                 LocationSerializer, SKUSerializer,
                                 SubCategorySerializer)


class LocationViewSet(viewsets.ModelViewSet):

    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class DepartmentViewSet(viewsets.ModelViewSet):

    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

    def list(
        self,
        request,
        location_pk=None
    ):
        departments = self.queryset.filter(location=location_pk)
        serializer = self.get_serializer(departments, many=True)
        return Response(serializer.data)

    def retrieve(
        self,
        request,
        pk=None,
        location_pk=None
    ):
        department = self.queryset.get(pk=pk, location=location_pk)
        serializer = self.get_serializer(department)        
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):

    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def list(self, request, location_pk=None, department_pk=None):
        categories = self.queryset.filter(
            department=department_pk
        )
        serializer = self.get_serializer(categories, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, location_pk=None, department_pk=None):
        category = self.queryset.get(
            pk=pk,
            department=department_pk
        )
        serializer = self.get_serializer(category)        
        return Response(serializer.data)

class SubCategoryViewSet(viewsets.ModelViewSet):

    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer

    def list(self,request, location_pk=None, department_pk=None, category_pk=None):
        subcategories = self.queryset.filter(
            category=category_pk
        )
        serializer = self.get_serializer(subcategories, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None, location_pk=None, department_pk=None, category_pk=None):
        subcategory = self.queryset.get(
            pk=pk,
            category=category_pk
            )
        serializer = self.get_serializer(subcategory)        
        return Response(serializer.data)

class SKUViewSet(viewsets.ModelViewSet):

    queryset = SKU.objects.all()
    serializer_class = SKUSerializer

    def list(
        self,
        request,
        location_pk=None,
        department_pk=None,
        category_pk=None,
        subcategory_pk=None
    ):
        skus = self.queryset.filter(
            subcategory=subcategory_pk)
        serializer = self.get_serializer(skus, many=True)
        return Response(serializer.data)

    def retrieve(
        self,
        request,
        pk=None,
        location_pk=None,
        department_pk=None,
        category_pk=None,
        subcategory_pk=None
    ):
        sku = self.queryset.get(
            pk=pk,
            subcategory=subcategory_pk
        )
        serializer = self.get_serializer(sku)        
        return Response(serializer.data)
