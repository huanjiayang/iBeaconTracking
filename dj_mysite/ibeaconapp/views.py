from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from ibeaconapp.models import FLOORPLAN
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
    floorplan_list = {"floorplanlist":["Computer Science floor 3", "Computer Science floor 2","Computer Science floor 1","Computer Science floor 0"]}
    return JsonResponse(floorplan_list)

def listDeployment(request):
    deployment_list =  {
	            	          "deploymentlist":["Beethoven","Mozart","Tchaikovsky"]
	                  }
    return JsonResponse(deployment_list)

def listDataset(request):
    dataset_list = {        
                    "datasetlist":["dataset01","dataset02","dataset03"]       
                    }
    return JsonResponse(dataset_list)

