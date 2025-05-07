from django.shortcuts import render
from rest_framework import generics
from gallery.models import Pic_post
from .serializers import Pic_Serializer
# Create your views here.

class Pic_List(generics.ListCreateAPIView):
    queryset = Pic_post.objects.filter(Pic_status = "published")
    serializer_class = Pic_Serializer


class Pic_detail(generics.RetrieveDestroyAPIView):
    queryset = Pic_post.objects.all()
    serializer_class = Pic_Serializer

