# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2017-04-10 22:47
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('persona', '0006_remove_hobby_tipo_hobby'),
    ]

    operations = [
        migrations.AddField(
            model_name='hobby',
            name='tipo_hobby',
            field=models.CharField(default='test', max_length=30),
            preserve_default=False,
        ),
    ]