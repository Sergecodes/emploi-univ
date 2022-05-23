from django.db import models
from django.utils.translation import gettext_lazy as _


class Enseignant(models.Model):
    matricule = models.CharField(max_length=15, primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)

    @classmethod
    def get_enseignant(cls, matricule):
        query = "SELECT * FROM enseignant WHERE matricule = %s LIMIT 1;"
        try:
            obj = cls.objects.raw(query, [matricule])[0]
        except IndexError:
            return None
        return obj 

    def __str__(self):
        return f'{self.prenom} {self.nom} - {self.matricule}'

    class Meta:
        db_table = 'enseignant'


class UE(models.Model):
    code = models.CharField(max_length=10, primary_key=True)
    intitule = models.CharField(max_length=50)

    @classmethod
    def get_ue(cls, code):
        query = "SELECT * FROM ue WHERE code = %s LIMIT 1;"
        
        try:
            obj = cls.objects.raw(query, [code])[0]
        except IndexError:
            return None
        return obj

    def __str__(self):
        return f'{self.code} - {self.intitule}'
    
    class Meta:
        db_table = 'ue'


class Salle(models.Model):
    nom = models.CharField(max_length=10, primary_key=True)
    capacite = models.PositiveSmallIntegerField()

    @classmethod
    def get_salle(cls, nom):
        query = "SELECT * FROM salle WHERE nom = %s LIMIT 1;"
        
        try:
            obj = cls.objects.raw(query, [nom])[0]
        except IndexError:
            return None
        return obj

    def __str__(self):
        return f'{self.nom} - {self.capacite} places'

    class Meta:
        db_table = 'salle'


class Niveau(models.Model):
    nom_bref = models.CharField(max_length=10, primary_key=True)
    nom_complet = models.CharField(max_length=20, unique=True)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 

    @classmethod
    def get_niveau(cls, nom_bref):
        query = "SELECT * FROM niveau WHERE nom_bref = %s LIMIT 1;"
        
        try:
            obj = cls.objects.raw(query, [nom_bref])[0]
        except IndexError:
            return None
        return obj

    def __str__(self):
        return self.nom_bref
        
    class Meta:
        db_table = 'niveau'


class Groupe(models.Model):
    nom = models.CharField(max_length=20, primary_key=True)

    @classmethod
    def get_groupe(cls, nom):
        query = "SELECT * FROM groupe WHERE nom = %s LIMIT 1;"
        
        try:
            obj = cls.objects.raw(query, [nom])[0]
        except IndexError:
            return None
        return obj

    def __str__(self):
        return self.nom
        
    class Meta:
        db_table = 'groupe'


class Filiere(models.Model):
    nom = models.CharField(max_length=20, primary_key=True)
    
    @classmethod
    def get_filiere(cls, nom):
        query = "SELECT * FROM filiere WHERE nom = %s LIMIT 1;"
        
        try:
            obj = cls.objects.raw(query, [nom])[0]
        except IndexError:
            return None
        return obj

    def __str__(self):
        return self.nom
        
    class Meta:
        db_table = 'filiere'


class Specialite(models.Model):
    nom = models.CharField(max_length=20, primary_key=True)
    effectif = models.PositiveSmallIntegerField()
    
    @classmethod
    def get_specialite(cls, nom):
        query = "SELECT * FROM specialite WHERE nom = %s LIMIT 1;"
        
        try:
            obj = cls.objects.raw(query, [nom])[0]
        except IndexError:
            return None
        return obj

    def __str__(self):
        return self.nom
        
    class Meta:
        db_table = 'specialite'


class Cours(models.Model):
    DAYS_OF_THE_WEEK = (
        ('LUN', _('Lundi')),
        ('MAR', _('Mardi')),
        ('MER', _('Mercredi')),
        ('JEU', _('Jeudi')),
        ('VEN', _('Vendredi')),
        ('SAM', _('Samedi')),
        ('DIM', _('Dimanche')),
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
        db_column='matricule_ens',
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

    @classmethod
    def get_cours(cls, code_ue):
        query = "SELECT * FROM cours WHERE code_ue = %s LIMIT 1;"
        
        try:
            obj = cls.objects.raw(query, [code_ue])[0]
        except IndexError:
            return None
        return obj

    def __str__(self):
        return str(self.ue)
        
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
        on_delete=models.SET_NULL,
        db_column='nom_specialite',
        related_name='regroupements',
        related_query_name='regroupement',
        blank=True,
        null=True
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

    @classmethod
    def get_regroupement_ue(cls, id):
        query = "SELECT * FROM regroupement_ue WHERE id_regroupement = %s LIMIT 1;"
        
        try:
            obj = cls.objects.raw(query, [id])[0]
        except IndexError:
            return None
        return obj

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['ue', 'groupe', 'filiere', 'niveau', 'specialite'],
                name='unique_ue_grp_fil_niv_spec'
            )
        ]
        db_table = 'regroupement_ue'

