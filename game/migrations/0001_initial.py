# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-23 23:17
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('host', models.TextField()),
                ('category', models.CharField(choices=[('celebrities', 'celebrities'), ('movies', 'movies'), ('all', 'all')], max_length=50)),
                ('words_per_player', models.SmallIntegerField(default=5)),
                ('time_per_round', models.DurationField(choices=[('00:00:30', ':30'), ('00:00:45', ':45'), ('00:01:00', '1:00'), ('00:01:30', '1:30')], default='00:01:00')),
                ('submissions', models.TextField()),
                ('created_date', models.DateTimeField(default=django.utils.timezone.now)),
            ],
        ),
    ]
