from django.urls import path
from .views import Pic_List, Pic_detail, All_discount_pics

app_name = 'artgal_api'

urlpatterns = [
    path('all/',Pic_List.as_view(), name = 'pic_list_create'),
    path('<int:pk>/', Pic_detail.as_view(), name = "pic_info"),
    path('all/discount/', All_discount_pics.as_view(), name = "dicount_pics" )
]