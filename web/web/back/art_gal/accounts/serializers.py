from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("id", "username", "email",)



class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only= True)
    class Meta:
        model = CustomUser
        fields = ("id","username","email","password",)
        extra_kwargs = {
            "password" : {"write_only" : True}
        }


    def validate(self, attrs):
        password = attrs.get("password", "")
        if len(password) < 5:
            raise serializers.ValidationError("Пароль должен быть длиной не менее 5 символов!")
        return attrs
    

    def create(self, validated_data):
        password = validated_data.pop("password")

        return CustomUser.objects.create_user(password=password, **validated_data)
    


class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField(required = True)
    password = serializers.CharField(write_only = True)


    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Неверные данные для входа!")