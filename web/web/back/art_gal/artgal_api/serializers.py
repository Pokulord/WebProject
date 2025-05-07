from rest_framework import serializers
from gallery.models import Pic_post


class Pic_Serializer(serializers.ModelSerializer):
    pic_au_name = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    class Meta:
        model = Pic_post
        fields = ('Pic_ID','Pic_name','Pic_author','Pic_status','Pic_contain','Pic_site_publish','Piс_year','Pic_price', 'Pic_slug', 'pic_au_name', 'Pic_discount','final_price')
    
    def get_pic_au_name(self,obj):
        return [artist.name for artist in obj.Pic_author.all()]
    
    def get_final_price(self, obj):
        return obj.get_price()