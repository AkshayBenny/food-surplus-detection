# Generated by Django 4.1.7 on 2023-03-05 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_address_user_alter_surpluschild_leftover_count_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='business',
            name='address',
            field=models.CharField(default='Nil', max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='ngo',
            name='address',
            field=models.CharField(default='Nil', max_length=255),
            preserve_default=False,
        ),
    ]
