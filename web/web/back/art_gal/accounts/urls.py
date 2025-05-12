from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

app_name= "accounts"

urlpatterns = [
    path("register/", UserRegistationView.as_view(), name = "reg_user"),
    path("login/", UserLoginAPIView.as_view(), name= "login_user"),
    path("logout/", UserLogoutAPIView.as_view(), name= "user_logout"),
    path("token/refresh", TokenRefreshView.as_view(), name= "token-refresh" )
]