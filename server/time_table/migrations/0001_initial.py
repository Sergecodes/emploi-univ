# Generated by Django 3.2.13 on 2022-05-11 15:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Enseignant',
            fields=[
                ('matricule', models.CharField(max_length=15, primary_key=True, serialize=False)),
                ('nom', models.CharField(max_length=50)),
                ('prenom', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'enseignant',
            },
        ),
        migrations.CreateModel(
            name='Filiere',
            fields=[
                ('nom', models.CharField(max_length=20, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'filiere',
            },
        ),
        migrations.CreateModel(
            name='Groupe',
            fields=[
                ('nom', models.CharField(max_length=20, primary_key=True, serialize=False)),
            ],
            options={
                'db_table': 'groupe',
            },
        ),
        migrations.CreateModel(
            name='Niveau',
            fields=[
                ('nom_bref', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('nom_complet', models.CharField(max_length=20, unique=True)),
            ],
            options={
                'db_table': 'niveau',
            },
        ),
        migrations.CreateModel(
            name='Salle',
            fields=[
                ('nom', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('capacite', models.PositiveSmallIntegerField()),
            ],
            options={
                'db_table': 'salle',
            },
        ),
        migrations.CreateModel(
            name='Specialite',
            fields=[
                ('nom', models.CharField(max_length=20, primary_key=True, serialize=False)),
                ('effectif', models.PositiveSmallIntegerField()),
            ],
            options={
                'db_table': 'specialite',
            },
        ),
        migrations.CreateModel(
            name='UE',
            fields=[
                ('code', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('intitule', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'ue',
            },
        ),
        migrations.CreateModel(
            name='Cours',
            fields=[
                ('ue', models.OneToOneField(db_column='code_ue', on_delete=django.db.models.deletion.RESTRICT, primary_key=True, serialize=False, to='time_table.ue')),
                ('jour', models.CharField(choices=[('MON', 'Monday'), ('TUE', 'Tuesday'), ('WED', 'Wednesday'), ('THU', 'Thursday'), ('FRI', 'Friday'), ('SAT', 'Saturday'), ('SUN', 'Sunday')], max_length=3)),
                ('heure_debut', models.TimeField()),
                ('heure_fin', models.TimeField()),
                ('td', models.BooleanField(default=False)),
            ],
            options={
                'db_table': 'cours',
            },
        ),
        migrations.CreateModel(
            name='RegroupementUE',
            fields=[
                ('id_regroupement', models.BigAutoField(primary_key=True, serialize=False)),
                ('filiere', models.ForeignKey(db_column='nom_filiere', on_delete=django.db.models.deletion.RESTRICT, related_name='regroupements', related_query_name='regroupement', to='time_table.filiere')),
                ('groupe', models.ForeignKey(blank=True, db_column='nom_groupe', null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='regroupements', related_query_name='regroupement', to='time_table.groupe')),
                ('niveau', models.ForeignKey(db_column='nom_niveau', on_delete=django.db.models.deletion.RESTRICT, related_name='regroupements', related_query_name='regroupement', to='time_table.niveau')),
                ('specialite', models.ForeignKey(db_column='nom_specialite', on_delete=django.db.models.deletion.RESTRICT, related_name='regroupements', related_query_name='regroupement', to='time_table.specialite')),
                ('ue', models.ForeignKey(db_column='code_ue', on_delete=django.db.models.deletion.RESTRICT, related_name='regroupements', related_query_name='regroupement', to='time_table.ue')),
            ],
            options={
                'db_table': 'regroupement_ue',
            },
        ),
        migrations.AddConstraint(
            model_name='regroupementue',
            constraint=models.UniqueConstraint(fields=('ue', 'groupe', 'filiere', 'niveau', 'specialite'), name='unique_ue_grp_fil_niv_spec'),
        ),
        migrations.AddField(
            model_name='cours',
            name='enseignant',
            field=models.ForeignKey(db_column='matricule_enseignant', on_delete=django.db.models.deletion.RESTRICT, related_name='cours', related_query_name='cours', to='time_table.enseignant'),
        ),
        migrations.AddField(
            model_name='cours',
            name='salle',
            field=models.ForeignKey(db_column='nom_salle', on_delete=django.db.models.deletion.RESTRICT, related_name='cours', related_query_name='cours', to='time_table.salle'),
        ),
    ]