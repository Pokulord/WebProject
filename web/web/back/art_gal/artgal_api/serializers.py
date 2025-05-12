from rest_framework import serializers
from gallery.models import Pic_post , Sold_pics


## 'Pic_ID','Pic_name','Pic_author','Pic_status','Pic_contain','Pic_site_publish','Pic_image','Piс_year','Pic_price', 'Pic_slug', 'pic_au_name', 'Pic_discount','final_price','How_many

class Pic_Serializer(serializers.ModelSerializer):
    pic_au_name = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()
    genre_name = serializers.SerializerMethodField()
    class Meta:
        model = Pic_post
        fields = ('__all__')
    
    def get_pic_au_name(self,obj):
        return [artist.name for artist in obj.Pic_author.all()]
    
    def get_genre_name(self, obj):
        return [genre.genre_name for genre in obj.Pic_genre.all()]
    
    def get_final_price(self, obj):
        return obj.get_price()
    
    

class Sold_Ser(serializers.ModelSerializer):
    class Meta:
        model = Sold_pics
        fields = ('Sold_id', 'Sold_pic', 'Sold_price', 'Sold_date')