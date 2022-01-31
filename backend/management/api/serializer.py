from rest_framework import serializers
from management.models import BatchDetails ,SubjectContent ,Files , Profile
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User=get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model=User
        fields=['email','password']


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model=SubjectContent
        fields='__all__'
    

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'name', 'position', 'college', 'user']



class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model=SubjectContent
        fields=['chapter','description''content_details',"id"]


class ContentSerializer(serializers.ModelSerializer):
    class Meta:
        model=BatchDetails
        fields=['batch','course','semester','subject','user','id']


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['files', 'subject_content', 'id']


class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = BatchDetails
        fields = '__all__'