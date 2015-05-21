from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from ibeaconapp.models import *
from django.core.context_processors import request
from django.contrib.auth.decorators import login_required
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
import sys
import os
import json
import threading
import functools
import logging


# Create your views here.

def async(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
            my_thread = threading.Thread(target=func, args=args, kwargs=kwargs)
            my_thread.start()
    return wrapper

@login_required
def index(request):
    
    users = User.objects.exclude(id=request.user.id)
    print 'Main program running'
    variables = RequestContext(request,{'users':users})
    return render_to_response('ibeaconapp/home.html',variables)

@async
def getdata(request):
    floorplan_list = FLOORPLAN.OBJECTS.order_by('-id')
    floorplan_list=1
    print floorplan_list
    return JsonResponse(floorplan_list)

def listFloorplan(request):
    try:
        floorplan_list = FLOORPLAN.objects.all()
        print floorplan_list[0].id
    except BaseException:
        print BaseException.message
    #return_list = {"floorplanlist":[{"name" : "Computer Science floor 3", "id" : "01"}, {"name" : "Computer Science floor 2", "id" : "02"},{"name" : "Computer Science floor 1", "id" : "03"},{"name" : "Computer Science floor 0", "id" : "04"}]}
    return_list = {"floorplanlist":[]}
    for fp in floorplan_list:
        return_list["floorplanlist"].append({"name":fp.NAME,"id":fp.id})
    
    return JsonResponse(return_list)

def listDeployment(request):
    fp_id = request.GET.get('floorplan_id', '')
    # use fp_id to query database
    deployment_list = []
    try:
        deployment_list = DEPLOYMENT.objects.filter(FLOORPLAN=fp_id)
    except BaseException:
        type, value, traceback = sys.exc_info()
        print('Error: %s' % (value))
    return_list =  {"deploymentlist":[]}
    for deployment in deployment_list:
        return_list["deploymentlist"].append({"name":deployment.NAME,"id":deployment.id})
    return JsonResponse(return_list)

def listDataset(request):
    fp_id = request.GET.get('floorplan_id', '')
    dp_id= request.GET.get('deployment_id', '')
    # use fp_id and dp_id to query database
    dataset_list = {        
                    "datasetlist":["dataset01","dataset02","dataset03"]       
                    }
    return JsonResponse(dataset_list)

def getfloorplanImg(request):
    fp_id = request.GET.get("floorplan_id","")
    try:
        fp = FLOORPLAN.objects.get(id=fp_id)
        #print fp.FLOOR_MAP
    except BaseException:
        print BaseException.message
    rps = {"floorplan_img":fp.FLOOR_MAP}
    return JsonResponse(rps)

