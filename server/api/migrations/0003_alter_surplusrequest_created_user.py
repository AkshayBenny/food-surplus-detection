# Generated by Django 4.1.7 on 2023-03-04 18:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_tempuser_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='surplusrequest',
            name='created_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
