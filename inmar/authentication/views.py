# -*- coding: utf-8 -*-
# Author : Partha

from __future__ import unicode_literals

from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponseRedirect
from django.shortcuts import render


def user_login(request):
    """
        @username
        @password
        Desc: For User login 
    """
    if request.method == "POST":
        # Make sure the credentials supplied
        if 'username' not in request.POST or request.POST['username'] == "":
            return JsonResponse({'message': 'Please Provide the Username and Password', 'status': 'fail'})
        
        # @params
        username = request.POST['username']
        password = request.POST['password']

        # UserCheck
        user = authenticate(username = username, password = password)

        # If user not exists
        if user is None:
            return JsonResponse({'message': 'Invalid User Credentials', 'status':'fail'})
        
        # If user found, login and return success response
        login(request, user)
        return JsonResponse({'message': 'User Logined Successfully', 'status':'success'})
    return render(request, "authentication/login_register.html", {})


def user_logout(request):
    """
        Desc: For User logout
    """
    logout(request)
    return HttpResponseRedirect('/auth/login/')
