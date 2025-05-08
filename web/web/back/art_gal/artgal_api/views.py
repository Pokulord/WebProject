from django.shortcuts import render
from rest_framework import generics
from gallery.models import Pic_post
from .serializers import Pic_Serializer
# Create your views here.


# Вывод всех картин
class Pic_List(generics.ListCreateAPIView):
    queryset = Pic_post.objects.filter(Pic_status = "published")
    serializer_class = Pic_Serializer

# ВЫвод инфы о конкретной картине
class Pic_detail(generics.RetrieveDestroyAPIView):
    queryset = Pic_post.objects.all()
    serializer_class = Pic_Serializer

# Вывод всех картин со скидкой
class All_discount_pics(generics.ListAPIView):
    queryset = Pic_post.objects.filter(Pic_discount__gt= 0)
    serializer_class = Pic_Serializer

