from django.db import models
from django.utils import timezone

# Create your models here.

# Model constants

STATUSES = (
    ('draft',"Draft"),
    ('published',"Published"),
    ('inorder',"InOrder")
)


class Artists(models.Model):
    actor_id = models.AutoField(primary_key=True)
    name = models.CharField("Художник", max_length=100)
    descr = models.TextField("Описание")


    class Meta:
        verbose_name = "Artists"


    def __str__(self):
        return self.name

class Pic_post(models.Model):
    Pic_ID = models.AutoField(primary_key=True)
    Pic_name = models.CharField(max_length=100)
    Pic_author = models.ManyToManyField(Artists,verbose_name='Artist_name', related_name='artist_name')
    Pic_status = models.CharField(max_length=11, choices=STATUSES, default='Published')
    Pic_contain = models.TextField(max_length=200, default="Нет описания")
    Pic_site_publish = models.DateTimeField(default=timezone.now)
    Piс_year = models.PositiveSmallIntegerField(default=0)
    Pic_price = models.PositiveSmallIntegerField(default=0)
    Pic_slug = models.SlugField(unique=True)
    Pic_discount = models.PositiveIntegerField(default=0, blank=True)
    class Meta:
        ordering = ('-Pic_site_publish',)
        verbose_name = "Pictures"

    def __str__(self):
        return self.Pic_name
    
    def get_price(self):
       fin_price =  int(self.Pic_price * (100 - self.Pic_discount) / 100) 
       return fin_price
