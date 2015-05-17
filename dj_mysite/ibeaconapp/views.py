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
    deployment_list = [ 
	              {
	            	  type:'classical',
	            	  content:["Beethoven","Mozart","Tchaikovsky"]
	              },
				  {
	            	  type:'pop',
	            	  content:["Beatles!!!","Corrs","Fleetwood Mac","Status Quo"]
	              }
	         ]
    return JsonResponse(deployment_list)

def listDataset(request):
    dataset_list =  [

                        {        
                        type:'classical',content:[
                                        {subtype:'Beethoven',subcontent:['211','212','213']},
                                        {subtype:'Mozart',subcontent:['221','222','223']},
                                        {subtype:'Tchaikovsky',subcontent:['231','232','233']}
                                     ]       
                        },
                        
                        {
                        type:'pop',content:[
                                    {subtype:'Beatles',subcontent:['111','112','113']},
                                    {subtype:'Corrs',subcontent:['121','122','123']},
                                    {subtype:'Fleetwood Mac',subcontent:['131','132','133']},
                                    {subtype:'Status Quo',subcontent:['141','142','143']}
                                   ]
                        }

             ]
    return JsonResponse(dataset_list)

