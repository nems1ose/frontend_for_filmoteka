# Generated by Django 4.2.7 on 2024-12-08 20:14

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_alter_history_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 8, 20, 14, 27, 485972, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
    ]
