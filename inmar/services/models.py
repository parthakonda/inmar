# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import uuid
from django.db import models

STATUS_CHOICES = (
    ('Active', 'Active'),
    ('InActive', 'InActive'),
    ('Deleted', 'Deleted')
)

class Location(models.Model):
    """ Locations """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name = models.CharField(
        max_length=50
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='Active'
    )


    class Meta:
        db_table = "location"


class Department(models.Model):
    """ Department """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    location = models.ForeignKey(
        Location,
        related_name="location_departments",
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    name = models.TextField()
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='Active'
    )


    class Meta:
        db_table = "department"


class Category(models.Model):
    """ Department Categories """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    department = models.ForeignKey(
        Department,
        related_name="department_categories",
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    name = models.CharField(
        max_length=50
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='Active'
    )


    class Meta:
        db_table = "category"


class SubCategory(models.Model):
    """ SubCategories """

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    category = models.ForeignKey(
        Category,
        related_name="category_subcategories",
        on_delete=models.SET_NULL,
        blank=True,
        null=True
    )
    name = models.CharField(
        max_length=50
    )
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='Active'
    )


    class Meta:
        db_table = "subcategory"


class SKU(models.Model):
    """ Stock Keeping Unit """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    subcategory = models.ForeignKey(
        SubCategory,
        related_name="subcategory_products",
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    stock_id = models.CharField(
        max_length=10,
        unique=True
    )
    name = models.CharField(
        max_length=30
    )
    barcode = models.CharField(
        max_length=50,
        null=True
    )


    class Meta:
        db_table = "stock_keeping_unit"

class RequestDataTrack(models.Model):
    audit_name = models.CharField(
        max_length=50,
        null = True
    )
    audit_dttm = models.DateTimeField(auto_now_add=True)
    request_type = models.CharField(max_length=20)
    upload_path = models.CharField(max_length=100)
    ftp_host = models.CharField(max_length=50, null=True)
    ftp_username = models.CharField(max_length=50, null=True)
    ftp_port = models.CharField(max_length=6)
    ftp_path = models.TextField(null = True)
    status = models.CharField(max_length = 20, null = True)
    
    class Meta:
        db_table = "request_data_track"