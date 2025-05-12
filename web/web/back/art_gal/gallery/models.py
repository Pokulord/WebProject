from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

# Create your models here.

# Model constants

STATUSES = (
    ('draft',"Draft"),
    ('published',"Published"),
    ('inorder',"InOrder")
)



class Genres(models.Model):
    genre_id = models.AutoField(primary_key= True)
    genre_name = models.CharField(unique=True , max_length= 100)


    class Meta: 
        verbose_name = "Genres"


    def __str__(self):
        return self.genre_name

class Artists(models.Model):
    actor_id = models.AutoField(primary_key=True)
    name = models.CharField("Художник", max_length=100)
    descr = models.TextField("Описание")


    class Meta:
        verbose_name = "Artists"


    def __str__(self):
        return self.name
    


def upload_to(instance, filename):
    return f'gallery/pics/{filename}'

class Pic_post(models.Model):
    Pic_ID = models.AutoField(primary_key=True)
    Pic_name = models.CharField(max_length=100)
    Pic_image = models.ImageField(_("Image"), upload_to=upload_to, default='gallery/pics/default.jpg')
    Pic_author = models.ManyToManyField(Artists,verbose_name='Artist_name', related_name='artist_name')
    Pic_status = models.CharField(max_length=11, choices=STATUSES, default='Published')
    Pic_contain = models.TextField(max_length=200, default="Нет описания")
    Pic_site_publish = models.DateTimeField(default=timezone.now)
    Piс_year = models.PositiveSmallIntegerField(default=0)
    Pic_price = models.PositiveSmallIntegerField(default=0)
    Pic_slug = models.SlugField(unique=True)
    Pic_discount = models.PositiveIntegerField(default=0, blank=True)
    Pic_genre = models.ManyToManyField(Genres, verbose_name='Pic_genre', related_name= 'pic_genre')
    How_many = models.PositiveSmallIntegerField(default=0)
    class Meta:
        ordering = ('-Pic_site_publish',)
        verbose_name = "Pictures"

    def __str__(self):
        return self.Pic_name
    
    def get_price(self):
       fin_price =  int(self.Pic_price * (100 - self.Pic_discount) / 100) 
       return fin_price
    

class Sold_pics(models.Model):
    Sold_id = models.AutoField(primary_key=True)
    Sold_pic = models.ForeignKey(Pic_post, verbose_name= 'Sold_pic', related_name= 'sold_pic', on_delete=models.PROTECT, null= True)
    Sold_price = models.PositiveSmallIntegerField(default=0)
    Sold_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.Sold_pic)


