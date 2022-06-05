# Generated by Django 3.2.13 on 2022-06-05 15:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('time_table', '0003_auto_20220605_1022'),
    ]

    operations = [
        migrations.AddField(
            model_name='cours',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='cours',
            name='id_cours',
            field=models.BigAutoField(default=1, primary_key=True, serialize=False),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='cours',
            name='ue',
            field=models.ForeignKey(db_column='code_ue', on_delete=django.db.models.deletion.RESTRICT, related_name='cours', related_query_name='cours', to='time_table.ue'),
        ),
        migrations.AddConstraint(
            model_name='cours',
            constraint=models.UniqueConstraint(fields=('ue', 'enseignant'), name='unique_ue_enseignant'),
        ),
    ]
