from django.urls import path
from .views import Ready_to_sold_Pic_List, Pic_detail, All_discount_pics, Add_new_Pic, Sell_pic

app_name = 'artgal_api'

urlpatterns = [
    path('ready/',Ready_to_sold_Pic_List.as_view(), name = 'pic_list_create'),
    path('<int:pk>/', Pic_detail.as_view(), name = "pic_info"),
    path('ready/discount/', All_discount_pics.as_view(), name = "dicount_pics" ),
    path('add-new-pic/', Add_new_Pic.as_view(), name = "add_new_pic"),
    path('sell/<int:Pic_ID>/', Sell_pic.as_view(), name = "sell_pic" )
    # path('all/the-most-sold')
]