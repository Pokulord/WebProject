# Generated by Django 5.1.7 on 2025-05-05 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0004_artists_pic_post_pic_price_pic_post_pic_slug'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pic_post',
            name='Pic_author',
        ),
        migrations.AddField(
            model_name='pic_post',
            name='Pic_author',
            field=models.ManyToManyField(related_name='actor_name', to='gallery.artists', verbose_name='artist_name'),
        ),
    ]
