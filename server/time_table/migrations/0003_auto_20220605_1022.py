# Generated by Django 3.2.13 on 2022-06-05 10:22

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('time_table', '0002_auto_20220604_0510'),
    ]

    operations = [
        migrations.AddField(
            model_name='cours',
            name='is_virtuel',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='cours',
            name='heure_debut',
            field=models.TimeField(default=datetime.datetime(2022, 6, 5, 10, 22, 9, 274620, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cours',
            name='heure_fin',
            field=models.TimeField(default=datetime.datetime(2022, 6, 5, 10, 22, 14, 722934, tzinfo=utc)),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cours',
            name='is_td',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='cours',
            name='jour',
            field=models.CharField(choices=[('LUN', 'Lundi'), ('MAR', 'Mardi'), ('MER', 'Mercredi'), ('JEU', 'Jeudi'), ('VEN', 'Vendredi'), ('SAM', 'Samedi'), ('DIM', 'Dimanche')], max_length=3),
        ),
    ]
