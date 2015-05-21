from django.conf.urls import patterns, include, url

from ibeaconapp import views

urlpatterns = patterns('',
    url(r'^$', views.index, name = 'index'),
    url(r'floorplan/img/$', views.getfloorplanImg, name = "getfloorplanImg"),
    url(r'floorplan/$', views.listFloorplan, name = 'listfloorplan'),
    url(r'deployment/$',views.listDeployment, name = 'listdeployment'),
    url(r'dataset/$',views.listDataset, name = 'listdataset')
)
