# Generated by Django 5.1.7 on 2025-05-08 12:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gallery', '0010_pic_post_pic_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sold_pics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('How_many_sold', models.PositiveSmallIntegerField(default=0)),
                ('Sold_price', models.PositiveSmallIntegerField(default=0)),
                ('Sold_pic', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, related_name='sold_pic', to='gallery.pic_post', verbose_name='Sold_pic')),
            ],
        ),
    ]
