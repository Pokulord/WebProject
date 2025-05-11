from django.shortcuts import render
from rest_framework import generics
from gallery.models import Pic_post, Artists, Sold_pics
from .serializers import Pic_Serializer , Sold_Ser
from rest_framework import status
from rest_framework.response import Response
from django.db.models import Count
# Create your views here.

######
#ListCreate - для получения инфы о конкретном объекте (только GET)
#RetrieveDestroy - для получения инфы и удаления (GET и DELETE)


## Блок с выводом

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

class The_most_sold_pics(generics.ListAPIView):
    serializer_class = Sold_Ser
    

    def get_queryset(self):
        most_sold_ids =  (
            Sold_pics.objects
            .values("Sold_pic")
            .annotate(count = Count('Sold_pic'))
            .order_by('-count')[:3]
        )

        sold_pics_ids = [item['Sold_pic'] for item in most_sold_ids]


        if not sold_pics_ids:
            return Pic_post.objects.none()



        return Pic_post.objects.filter(Pic_ID__in = sold_pics_ids)
    

    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # result = [
        #     {
        #         'Sold_pic' : pic['Sold_pic'],
        #         'Sold_pic_str' : Pic_post.objects.get(Pic_ID= pic['Sold_pic']).__str__(),
        #         'count' : pic['count']
        #     }
        #     for pic in queryset
        # ]
        print(queryset)
        serializer = Pic_Serializer(queryset, many = True)
        print(serializer.data)

        if not serializer.data:
            return Response({'message' : "No_data_found"}, status= 404)
        return Response(serializer.data)


## Блок с внесением изменений

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


            sold_price = request.data.get('Sold_price', 0)

            Sold_pics.objects.create(
                Sold_pic = instance,
                Sold_price = sold_price
            )

        serializer = self.get_serializer(instance)
        return Response(serializer.data, status= status.HTTP_200_OK)

