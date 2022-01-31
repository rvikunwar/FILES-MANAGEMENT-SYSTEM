from django.shortcuts import render
from django.http import HttpResponse
from .serializer import *
from management.models import BatchDetails ,SubjectContent ,Files ,Profile
from rest_framework.generics import ListAPIView,RetrieveAPIView ,RetrieveUpdateAPIView,ListCreateAPIView,RetrieveUpdateDestroyAPIView
from django.views.generic.edit import DeleteView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import SessionAuthentication,BasicAuthentication
from rest_framework.decorators import api_view, authentication_classes,permission_classes
from rest_framework.parsers import JSONParser 


class TopicView(ListAPIView):
    serializer_class=TopicSerializer
    permission_classes=[AllowAny]
    def get_queryset(self):
        queryset=BatchDetails.objects.all()
        return queryset

    def list(self, request):
        
        queryset = self.get_queryset()
        serializer = ContentSerializer(queryset, many=True)
        
        return Response(serializer.data)


    


class ProfileView(ListAPIView):
    serializer_class=ProfileSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        print(self.request.user)
        queryset =Profile.objects.filter(user=self.request.user)
        return queryset

    def list(self, request):
        queryset = self.get_queryset()
        serializer = ProfileSerializer(queryset)
        return Response(serializer.data)


class ProfileRetUpdateView(RetrieveUpdateAPIView):
    serializer_class=ProfileSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        
        queryset =Profile.objects.filter(user=self.request.user)
        return queryset

    def list(self, request):
        
        queryset = self.get_queryset()
        serializer = ProfileSerializer(queryset)
        return Response(serializer.data)




  

class SubjectUpdateView(RetrieveUpdateDestroyAPIView):
    serializer_class=SubjectSerializer
    permission_classes=[IsAuthenticated]
    queryset =SubjectContent.objects.all()

    

class SubjectListCreateView(ListCreateAPIView):
    serializer_class=SubjectSerializer
    permission_classes=[IsAuthenticated]

    def get_queryset(self):
        queryset =BatchDetails.objects.filter(user=self.request.user)
        
        return queryset

    def list(self, request):
        queryset =self.get_queryset()
        cont=[]
        for i in queryset:
            queryset_1=SubjectContent.objects.filter(content_details=i)
            
           
            for x in queryset_1:
                serializer = SubjectSerializer(x)
            
                cont.append(serializer.data)

        return Response(cont)



@api_view(['POST','GET'])
@authentication_classes([BasicAuthentication])
@permission_classes([AllowAny])
def Getdata(request):
    if request.method=='POST':
        dat=request.data
        queryset =BatchDetails.objects.filter(batch=dat['batch'],semester=int(dat['semester']),course=dat['course'],subject=dat['subject'])
        queryset_2=Profile.objects.filter(user=queryset[0].user)
        queryset_1=SubjectContent.objects.filter(content_details=queryset[0])
        s=[]
        s_1=[]
        for i in queryset_1: 
            ss=SubjectSerializer(i,partial=True)
            
            s.append(ss.data)
        for i in queryset_2:
            ss_1=ProfileSerializer(i,partial=True)
            s_1.append(ss_1.data)
        print(s_1,"pp")
        return Response([s,s_1])

    else:
        print("shj")
    return Response()

@api_view(['GET','POST'])
@authentication_classes([BasicAuthentication])
@permission_classes([AllowAny])
def Filesdata(request):
    queryset =Files.objects.all()

    if request.method=='GET':
        s_1=[]
        for i in queryset:
           ss_1=FilesSerializer(i)
         
           s_1.append(ss_1.data)
        return Response(s_1)

    elif request.method == 'POST': 
      
        file_data = FilesSerializer(data=request.data,partial=True) 
        print(request.data)
        if file_data.is_valid(): 
            file_data.save() 
            return Response(file_data.data) 
        return Response(file_data.errors) 
    else:
        print("shj")
    return Response()

@api_view(['GET', 'PUT', 'DELETE'])
def fileone(request, pk):
    try: 
        file = Files.objects.get(pk=pk) 
    except: 
        return Response({'message': 'The file does not exist'}) 
 
    if request.method == 'GET': 
        file_data = FilesSerializer(file) 
        return Response(file_data.data) 
 
    
 
    elif request.method == 'DELETE': 
        file.delete() 
        return Response({'message': 'File was deleted successfully!'})
    
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


class CreateProfile(APIView):

    def post(self, request):
        data = request.data
        data['user'] = request.user.id
        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_201_CREATED)

    def get(self, request):
        if request.query_params.get('id'):
            data = Profile.objects.filter(user=int(request.query_params.get('id')))
            serializer = ProfileSerializer(data, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        data = Profile.objects.filter(user=request.user.id)
        serializer = ProfileSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CreateProfile_v1(APIView):

    def put(self, request, id):
        data = request.data
        instance = Profile.objects.get(id=id)
        serializer = ProfileSerializer(instance=instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_201_CREATED)


class ContentListCreateView(APIView):

    def post(self, request):
        data = request.data
        data['user'] = request.user.id
        serializer = ContentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_201_CREATED)

    def get(self, request):
        data = BatchDetails.objects.filter(user=request.user.id)
        serializer = ContentSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ContentUpdateView(APIView):

    def put(self, request, id):
        data = request.data
        instance = BatchDetails.objects.get(id=id)
        serializer = ContentSerializer(instance=instance, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_201_CREATED)


class SubjectDatatView(APIView):

    def get(self, request):
        subject = int(request.query_params.get('subject'))
        if subject == -1:
            data = SubjectContent.objects.filter(user=request.user.id)
        else:
            data = SubjectContent.objects.filter(user=request.user.id, content_details=subject)

        serializer = SubjectSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        data['user'] = request.user.id
        serializer = SubjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_201_CREATED)


class Filesdata(APIView):

    def get(self, request):
        subject_content= int(request.query_params.get('subject_content'))
        data = Files.objects.filter(subject_content=subject_content)
        serializer = FilesSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        serializer = FilesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_201_CREATED)


from rest_framework.permissions import AllowAny


class BatchDetailsv1(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        batch = BatchDetails.objects.filter().values('batch').distinct()
        course = BatchDetails.objects.filter().values('course').distinct()
        semester = BatchDetails.objects.filter().values('semester').distinct()
        subject = BatchDetails.objects.filter().values('subject').distinct()

        return Response({"batch":batch, "course":course, "semester":semester, "subject":subject},  status=status.HTTP_200_OK)


class SubjectDetails(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        if request.query_params.get('id'):
            id = request.user.id
            subject_details = SubjectContent.objects.filter(user=id)
            serializer = SubjectSerializer(subject_details, many=True)
            return Response(serializer.data,  status=status.HTTP_200_OK)

        content_details = BatchDetails.objects.filter(batch=request.query_params.get('batch'),
                                                      subject=request.query_params.get('subject'),
                                                      course=request.query_params.get('course'),
                                                      semester=request.query_params.get('semester'))
        print(content_details)
        if len(content_details)>0:
            subject_details = SubjectContent.objects.filter(content_details=content_details[0].id)
            serializer = SubjectSerializer(subject_details, many=True)
            return Response(serializer.data,  status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)


class SubFiles(APIView):
    def get(self, request):
        file = Files.objects.filter(subject_content=request.query_params.get('id'))
        serializer = FilesSerializer(file, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)




