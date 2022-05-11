from django.db import models
from django.utils.translation import gettext_lazy as _


class Enseignant(models.Model):
    matricule = models.CharField(max_length=15, primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)

    class Meta:
        db_table = 'enseignant'


class UE(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    intitule = models.CharField(max_length=50)
    
    class Meta:
        db_table = 'ue'


class Salle(models.Model):
    nom = models.CharField(max_length=10, primary_key=True)
    capacite = models.PositiveSmallIntegerField()

    class Meta:
        db_table = 'salle'


class Niveau(models.Model):
    nom_bref = models.CharField(max_length=10, primary_key=True)
    nom_complet = models.CharField(max_length=20, unique=True)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

    class Meta:
        db_table = 'niveau'


class Groupe(models.Model):
    nom = models.CharField(max_length=20, primary_key=True)

    class Meta:
        db_table = 'groupe'


class Filiere(models.Model):
    nom = models.CharField(max_length=20, primary_key=True)
    
    class Meta:
        db_table = 'filiere'


class Specialite(models.Model):
    nom = models.CharField(max_length=20, primary_key=True)
    effectif = models.PositiveSmallIntegerField()
    
    class Meta:
        db_table = 'specialite'


class Cours(models.Model):
    DAYS_OF_THE_WEEK = (
        ('MON', _('Monday')),
        ('TUE', _('Tuesday')),
        ('WED', _('Wednesday')),
        ('THU', _('Thursday')),
        ('FRI', _('Friday')),
        ('SAT', _('Saturday')),
        ('SUN', _('Sunday')),
    )

    ue = models.OneToOneField(
        UE, 
        db_column='code_ue', 
        primary_key=True, 
        on_delete=models.RESTRICT
    )
    enseignant = models.ForeignKey(
        Enseignant,
        on_delete=models.RESTRICT,
        db_column='matricule_enseignant',
        related_name='cours',
        related_query_name='cours'
    )
    salle = models.ForeignKey(
        Salle,
        on_delete=models.RESTRICT,
        db_column='nom_salle',
        related_name='cours',
        related_query_name='cours'
    )
    jour = models.CharField(max_length=3, choices=DAYS_OF_THE_WEEK)
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()
    td = models.BooleanField(default=False)

    class Meta:
        db_table = 'cours'


class RegroupementUE(models.Model):
    id_regroupement = models.BigAutoField(primary_key=True)
    ue = models.ForeignKey(
        UE,
        on_delete=models.RESTRICT,
        db_column='code_ue',
        related_name='regroupements',
        related_query_name='regroupement'
    )
    groupe = models.ForeignKey(
        Groupe, 
        on_delete=models.SET_NULL,
        db_column='nom_groupe',
        related_name='regroupements',
        related_query_name='regroupement',
        blank=True, 
        null=True
    )
    filiere = models.ForeignKey(
        Filiere,
        on_delete=models.RESTRICT,
        db_column='nom_filiere',
        related_name='regroupements',
        related_query_name='regroupement'
    )
    niveau = models.ForeignKey(
        Niveau, 
        on_delete=models.RESTRICT,
        db_column='nom_niveau',
        related_name='regroupements',
        related_query_name='regroupement'
    )
    specialite = models.ForeignKey(
        Specialite, 
        on_delete=models.RESTRICT,
        db_column='nom_specialite',
        related_name='regroupements',
        related_query_name='regroupement'
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['ue', 'groupe', 'filiere', 'niveau', 'specialite'],
                name='unique_ue_grp_fil_niv_spec'
            )
        ]
        db_table = 'regroupement_ue'

