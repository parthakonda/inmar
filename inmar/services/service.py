import csv, base64
from services.models import SKU, Category, Department, Location, SubCategory
from django.utils.translation import ugettext as _


class SKUApi(object):

    def create_location(
        self,
        location=None
    ):
        try:
            _location, _is_created = Location.objects.get_or_create(
                name=location
            )
        except UnicodeDecodeError:
            _location, _is_created = Location.objects.get_or_create(
                name=location.decode('latin-1').encode('utf-8')
            )
        return (
            _location,
            _is_created
        )

    def create_department(
        self,
        location=None,
        department=None
    ):
        # import pdb;pdb.set_trace()
        try:
            _department, _is_created = Department.objects.get_or_create(
                location=location,
                name=department
            )
        except Exception as me:
           _department, _is_created = Department.objects.get_or_create(
                location=location,
                name=department.decode()
            )
        return (
            _department,
            _is_created
        )

    def create_category(
        self,
        department=None,
        category=None
    ):
        try:
            _category, _is_created = Category.objects.get_or_create(
                department=department,
                name=category
            )
        except UnicodeDecodeError:
            _category, _is_created = Category.objects.get_or_create(
                department=department,
                name=category.decode('latin-1').encode('utf-8')
            )
        return (
            _category,
            _is_created
        )

    def create_subcategory(
        self,
        category=None,
        subcategory=None
    ):
        try:
            _subcategory, _is_created = SubCategory.objects.get_or_create(
                category=category,
                name=subcategory
            )
        except UnicodeDecodeError:
            _subcategory, _is_created = SubCategory.objects.get_or_create(
                category=category,
                name=subcategory.decode('latin-1').encode('utf-8')
            )
        return (
            _subcategory,
            _is_created
        )

    def create_sku(
        self,
        subcategory=None,
        sku_id=None,
        sku_name=None
    ):
        try:
            _sku, _is_created = SKU.objects.get_or_create(
                stock_id=sku_id,
                name=sku_name,
                subcategory=subcategory
            )
        except UnicodeDecodeError:
            _sku, _is_created = SKU.objects.get_or_create(
                stock_id=sku_id,
                name=sku_name.decode('latin-1').encode('utf-8'),
                subcategory=subcategory
            )
        return (
            _sku,
            _is_created
        )

    def create(
        self,
        location=None,
        department=None,
        category=None,
        subcategory=None,
        sku_id=None,
        sku_name=None
    ):
        _location, _ = self.create_location(
            location=location
        )
        _department, _ = self.create_department(
            location=_location,
            department=department
        )
        _category, _ = self.create_category(
            department=_department,
            category=category
        )
        _subcategory, _ = self.create_subcategory(
            category=_category,
            subcategory=subcategory
        )
        _sku, _ = self.create_sku(
            subcategory=_subcategory,
            sku_id=sku_id,
            sku_name=sku_name
        )
        return True

    def flush_all(self):
        Location.objects.all().delete()
        Department.objects.all().delete()
        Category.objects.all().delete()
        SubCategory.objects.all().delete()
        SKU.objects.all().delete()

def load_data(
    file_instance=None
):
    sku_obj = SKUApi()
    sku_obj.flush_all()
    all_rows = csv.DictReader(file_instance)
    for row in all_rows:
        for key, value in row.items():
            try:
                row.update({key:value.decode('latin-1').encode('utf-8')})
            except Exception as e:
                pass
        sku_obj.create(
           location=row['LOCATION'],
           department=row['DEPARTMENT'],
           category=row['CATEGORY'],
           subcategory=row['SUBCATEGORY'],
           sku_id=row['SKU'],
           sku_name=row['NAME']
        )
    return True

