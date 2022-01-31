from django.db import models
from django.contrib.auth import get_user_model
import datetime

User = get_user_model()


class Profile(models.Model):
    name = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    college = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class BatchDetails(models.Model):
    batch=models.CharField(max_length=100)
    course=models.CharField(max_length=100)
    semester=models.IntegerField()
    subject=models.CharField(max_length=100)
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)


class SubjectContent(models.Model):
    chapter=models.CharField(max_length=100)
    description=models.CharField(max_length=10000, null=True, blank=True)
    date=models.DateField(default=datetime.date.today)
    content_details=models.ForeignKey(BatchDetails,on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Files(models.Model):
    files=models.FileField(upload_to="downloads")
    subject_content=models.ForeignKey(SubjectContent,on_delete=models.CASCADE,null=True)
