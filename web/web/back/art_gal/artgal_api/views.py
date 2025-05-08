from django.shortcuts import render
from rest_framework import generics
from gallery.models import Pic_post, Artists, Sold_pics
from .serializers import Pic_Serializer
from rest_framework import status
from rest_framework.response import Response
# Create your views here.

######
#ListCreate - для получения инфы о конкретном объекте (только GET)
#RetrieveDestroy - для получения инфы и удаления (GET и DELETE)


# Вывод всех картин

class Ready_to_sold_Pic_List(generics.ListAPIView):
    queryset = Pic_post.objects.filter(Pic_status = "published", How_many__gt=0 )
    serializer_class = Pic_Serializer

# ВЫвод инфы о конкретной картине
class Pic_detail(generics.RetrieveDestroyAPIView):
    queryset = Pic_post.objects.all()
    serializer_class = Pic_Serializer

# Вывод всех картин со скидкой
class All_discount_pics(generics.ListAPIView):
    queryset = Pic_post.objects.filter(Pic_discount__gt= 0 , How_many__gt =0)
    serializer_class = Pic_Serializer


# Добавление новых картин

class Add_new_Pic(generics.CreateAPIView):
    serializer_class = Pic_Serializer

    def create(self, request , *args, **kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        source_instance = serializer.save()
        return Response(serializer.data, status= status.HTTP_201_CREATED)
    

# Продажа картин 

class Sell_pic(generics.UpdateAPIView):
    queryset = Pic_post.objects.all()
    serializer_class = Pic_Serializer
    lookup_field = 'Pic_ID'

    def patch(self, request, *args , **kwargs):
        instance = self.get_object()

        if instance.How_many > 0:
            instance.How_many -= 1
            instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status= status.HTTP_200_OK)

