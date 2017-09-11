from rest_framework import status, viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.views import APIView
from services.models import SKU, Category, Department, Location, SubCategory
from services.serializers import (CategorySerializer, DepartmentSerializer,
                                 LocationSerializer, SKUSerializer,
                                 SubCategorySerializer, SKUListSerializer)


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


class SKUApiView(APIView):

    def get(self, request, format=None):
        location = request.GET.get('location', None)
        department = request.GET.get('department', None)
        category = request.GET.get('category', None)
        subcategory = request.GET.get('subcategory', None)

        all_sku = SKU.objects.all()
        
        # Location Filter
        if location is not None and location != "":
            all_sku = all_sku.filter(
                subcategory__category__department__location__name__iexact = location
            )
        
        # Department Filter
        if department is not None and department != "":
            all_sku = all_sku.filter(
                subcategory__category__department__name__iexact = department
            )
        
        # category Filter
        if category is not None and category != "":
            all_sku = all_sku.filter(
                subcategory__category__name__iexact = category
            )

        # subcategory Filter
        if subcategory is not None and subcategory != "":
            all_sku = all_sku.filter(
                subcategory__name__iexact = subcategory
            )
        _serializer = SKUListSerializer(all_sku, many=True)
        return Response(_serializer.data, status = status.HTTP_200_OK)


class FlushApiView(APIView):

    def get(self, request, format=None):
        try:
            Location.objects.all().delete()
            Department.objects.all().delete()
            Category.objects.all().delete()
            SubCategory.objects.all().delete()
            SKU.objects.all().delete()
            return Response({'message': 'Successfully Flushed'})
        except:
            return Response({'message': 'Flush Failed'})
            