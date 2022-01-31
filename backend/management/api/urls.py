
from django.urls import path
from .views import *


urlpatterns = [
   path('',TopicView.as_view()),
   path('profile/',ProfileView.as_view()),
   path('createprofile/', CreateProfile.as_view()),
   path('createprofile/<int:id>/', CreateProfile_v1.as_view()),

   path('profile/<int:pk>', ProfileRetUpdateView.as_view()),
   path('contentrestriction/', ContentListCreateView.as_view()),
   path('contentrestriction/<int:pk>/', ContentUpdateView.as_view()),
   path('batchdetails/', BatchDetailsv1.as_view()),
   path('subjectdetails/', SubjectDetails.as_view()),
   path('subfiles/', SubFiles.as_view()),

   path('subjectdet/', SubjectDatatView.as_view()),
   path('subjectdet/<int:pk>/', SubjectUpdateView.as_view()),

   path('getdata/', Getdata,name="getdata"),
   path('file/', Filesdata.as_view()),
   path('file/<pk>/', fileone),
]
