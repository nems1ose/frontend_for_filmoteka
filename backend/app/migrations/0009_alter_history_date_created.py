# Generated by Django 4.2.7 on 2024-11-26 19:23

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_alter_history_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 11, 26, 19, 23, 54, 605587, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
    ]