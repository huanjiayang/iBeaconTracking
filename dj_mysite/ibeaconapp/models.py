from django.db import models
from django.template.defaultfilters import default

# Create your models here.
class FLOORPLAN(models.Model):
    NAME = models.CharField(max_length = 250)
    AUTHOR = models.CharField(max_length = 250)
    FLOOR_MAP = models.CharField(max_length = 250)
    NOTES = models.CharField(max_length = 250)
    UPLOAD_TIME = models.DateTimeField('date uploaded')
    X_ZERO = models.IntegerField(default = 0)
    Y_ZERO = models.IntegerField(default = 0)
    SCALE = models.IntegerField(default = 0)
    
    def __unicode__(self):
        return self.NAME
    
class DEPLOYMENT(models.Model):
    FLOORPLAN = models.ForeignKey(FLOORPLAN)
    NAME = models.CharField(max_length = 250)
    NOTES = models.CharField(max_length = 250)
    UPLOAD_TIME = models.DateTimeField('date uploaded')
    AUTHOR = models.CharField(max_length = 250)
    
    def __unicode__(self):
        print "test2"
        return self.NAME

    

class BEACON_POSITION(models.Model):
    DEPLOYMENT = models.ForeignKey(DEPLOYMENT)
    TYPE = models.CharField(max_length = 250)
    BEACON_ID = models.CharField(max_length = 250)
    BEACON_MAC = models.CharField(max_length = 250)
    CREATED_BY = models.CharField(max_length = 250)
    CREATE_TIME = models.DateTimeField('date uploaded')
    CORD_X = models.DecimalField(default = 0.0, decimal_places=2, max_digits=10)
    CORD_Y = models.DecimalField(default = 0.0, decimal_places=2, max_digits=10)
    NOTES = models.CharField(max_length = 250)
    
    def __unicode__(self):
        return self.BEACON_MAC
    
    

class LOC_RECORD(models.Model):
    DEPLOYMENT = models.ForeignKey(DEPLOYMENT)
    NAME = models.CharField(max_length = 250)
    NOTES = models.CharField(max_length = 250)
    UPLOAD_TIME = models.DateTimeField('date uploaded')
    AUTHOR = models.CharField(max_length = 250)
    
    def __unicode__(self):
        return self.NAME
    


class TARGET(models.Model):
    NAME = models.CharField(max_length = 250)
    MOBILE = models.CharField(max_length = 250)
    NOTES = models.CharField(max_length = 250)
    MAC = models.CharField(max_length = 250)
    REFERECE = models.CharField(max_length = 250)
    
    def __unicode__(self):
        return self.NAME
    


class TARGET_LOC(models.Model):
    LOC_RECORD = models.ForeignKey(LOC_RECORD)
    TARGET_ID = models.ForeignKey(TARGET)
    TYPE = models.CharField(max_length = 250)
    ALGORITHM = models.CharField(max_length = 250)
    LOC_TIME = models.DateTimeField('date calculated')
    CORD_X = models.DecimalField(default = 0.0, decimal_places=2, max_digits=10)
    CORD_Y = models.DecimalField(default = 0.0, decimal_places=2, max_digits=10)
    NOTES = models.CharField(max_length = 250)
    
    def __unicode__(self):
        return self.NOTES
    
    

class RSSI(models.Model):
    LOC_RECORD = models.ForeignKey(LOC_RECORD)
    BEACON_POSITION = models.ForeignKey(BEACON_POSITION)
    RSSI = models.IntegerField(default = 0)
    
    def __unicode__(self):
        return self.RSSI