from django.contrib import admin
from gallery.models import Pic_post, Artists, Sold_pics
# Register your models here.

class PicAdmin(admin.ModelAdmin):
    list_display = ('Pic_ID','Pic_name','Pic_status','Pic_site_publish', 'Pic_slug')
    list_filter = ('Pic_status',)
    search_fields = ['Pic_name']
    prepopulated_fields  = {'Pic_slug': ('Pic_name',)}



admin.site.register(Pic_post,PicAdmin)
admin.site.register(Artists)
admin.site.register(Sold_pics)

