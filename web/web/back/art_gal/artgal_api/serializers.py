from rest_framework import serializers
from gallery.models import Pic_post


class Pic_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Pic_post
        fields = ('Pic_ID','Pic_name','Pic_author','Pic_status','Pic_contain','Pic_site_publish','Piс_year','Pic_price', 'Pic_slug')