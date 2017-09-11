# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import json
from datetime import datetime

from django.shortcuts import render
from django.views import View
from django.http import HttpResponse, Http404
from services.tasks import RequestImportDataTask
from services.service import load_data

from services.s3_api import S3API    

from services.models import SKU, Category, Department, Location, SubCategory, RequestDataTrack


def home(request):
    message = ""
    return render(request, "home.html", {"message": message})


class BaseView(View):
    """ Class based view to resolve the functionality routes based on the request path """
    template = None
    _accepted_views = ['search', 'add', 'view']
    def __init__(self, **kwargs):
        """ Getting template name """
        self.template=kwargs['template']
        del kwargs['template']
        #Check for the plugin here
        super(BaseView, self).__init__(**kwargs)

    def mutate_request(self, request):
        """ Mutating the Request Contents """
        setattr(request,'POST',request.POST.copy())
        setattr(request,'GET',request.GET.copy())
        return request

    def get(self, request, dispatch=None):
        """ Invoked wheh the request type is GET """
        if dispatch in self._accepted_views:
            return getattr(self, dispatch)(request)
        else:
            if hasattr(self, dispatch):
                return getattr(self, dispatch)(request)
        raise Http404("Page Not Found")            
    
    def post(self, request, dispatch=None):
        """ Invoked wheh the request type is GET """
        if dispatch in ['save','update']:
            return getattr(self, dispatch)(request)
        else:
            if hasattr(self, dispatch):
                return getattr(self, dispatch)(request)
        raise Http404("Page Not Found")


class SearchAddView(BaseView):
    """ Basic PageView for SAVE type pages """
    
    def search(self, request):
        """ Invoked when the request URL contains the /search/ in the path """
        context = {}

        if hasattr(self, 'ADD'):
            context.update({'ADD':self.ADD})
        else:
            context.update({'ADD':True})
        return render(request,self.template, context)

    def add(self, request):
        """ Invoked when the request URL contains the /add/ in the path """
        return render(request,self.template, {})

    def view(self, request):
        """ Invoked wheh the request URL contains the /view/ in the path """
        return render(request,self.template, {})

def request_import_data(request):
    _file_instance = request.FILES['file']
    s3_conn = S3API()
    s3_conn.connect()
    user = "admin" #todo: need to get from request.user.username
    file_name = user + "_" + datetime.now().__str__() +".csv"
    s3_conn.upload(file_name, _file_instance)
    track = RequestDataTrack()
    track.audit_name = user
    track.request_type = 's3'
    track.upload_path = file_name
    track.save()
    task = RequestImportDataTask()
    task.apply_async(args=(track.pk,))
    return HttpResponse("Initiated")

def dump_data(request):
    
    DEPARTMENT = {
        'name': 'WB_ITEM_MASTER_HIERARCHY',
        'children': []
    }

    # Get locations
    _locations = Location.objects.all()
    
    for loc_idx, location in enumerate(_locations):
        DEPARTMENT['children'].append({
            'name': location.name,
            'children': []
        })
        # Get Department
        _departments = Department.objects.filter(location = location)

        for dep_idx, department in enumerate(_departments):
            # Get Categories
            DEPARTMENT['children'][loc_idx]['children'].append({
                'name': department.name,
                'children': []
            })
            _categories = Category.objects.filter(department = department)

            for cat_idx, category in enumerate(_categories):
                # Get Subcategories
                _subcategories = SubCategory.objects.filter(category=category)
                DEPARTMENT['children'][loc_idx]['children'][dep_idx]['children'].append({
                    'name': category.name,
                    'children': []
                })
                for subcategory in _subcategories:
                    DEPARTMENT['children'][loc_idx]['children'][dep_idx]['children'][cat_idx]['children'].append(
                        {'name': subcategory.name}
                    )
    return HttpResponse(json.dumps(DEPARTMENT))

def show_infographic(request):
    return render(request, "services/infographic.html", {})