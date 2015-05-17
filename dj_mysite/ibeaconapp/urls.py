from django.conf.urls import patterns, include, url

from ibeaconapp import views

urlpatterns = patterns('',
    url(r'^$', views.index, name = 'index'),
    url(r'floorplan/$', views.listFloorplan, name = 'listfloorplan'),
)
