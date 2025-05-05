from django.urls import path
from .views import Pic_List, Pic_detail

app_name = 'artgal_api'

urlpatterns = [
    path('',Pic_List.as_view(), name = 'pic_list_create'),
    path('<int:pk>/', Pic_detail.as_view(), name = "pic_info")
]