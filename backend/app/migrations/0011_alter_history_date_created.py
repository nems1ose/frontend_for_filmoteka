# Generated by Django 4.2.7 on 2024-12-01 09:28

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_alter_history_date_created'),
    ]

    operations = [
        migrations.AlterField(
            model_name='history',
            name='date_created',
            field=models.DateTimeField(default=datetime.datetime(2024, 12, 1, 9, 28, 4, 553768, tzinfo=datetime.timezone.utc), verbose_name='Дата создания'),
        ),
    ]