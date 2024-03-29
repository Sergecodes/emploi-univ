import json
from django.db import models, connection
from django.utils.translation import gettext_lazy as _

from .utils import dict_fetchone, parse_cours_list


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
    code = models.CharField(max_length=30, primary_key=True)
    intitule = models.CharField(max_length=50)

    @classmethod
    def get_ue(cls, code):
        query = """
            SELECT code_ue, intitule, matricule_ens, ens.nom AS nom_ens, 
            ens.prenom AS prenom_ens, nom_filiere, nom_niveau, nom_specialite
            FROM regroupement AS reg, cours, ue WHERE ue.code = %s AND
            cours.code_ue = reg.code_ue AND reg.code_ue = ue.code_ue 
            LIMIT 1;
        """
        
        with connection.cursor() as cursor:
            cursor.execute(query, [code])
            res = dict_fetchone(cursor)
            return res

    def __str__(self):
        return f'{self.code} - {self.intitule}'
    
    class Meta:
        db_table = 'ue'


class Salle(models.Model):
    nom = models.CharField(max_length=20, primary_key=True)
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
        # Even if we don't need the id_regroupement, we must include it in the SELECT query
        # in order to be able to use `objects.raw()`
        query = """
            SELECT id_regroupement, nom_groupe, nom_specialite, nom_filiere,  
            nom_niveau FROM regroupement WHERE nom_groupe = %s LIMIT 1;
        """
        try:
            obj = Regroupement.objects.raw(query, [nom])[0]
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
    nom = models.CharField(max_length=30, primary_key=True)
    
    @classmethod
    def get_specialite(cls, nom):
        query = """
            SELECT DISTINCT id_regroupement, nom_specialite, nom_filiere, 
            nom_niveau FROM regroupement reg, specialite spec WHERE 
            reg.nom_specialite = spec.nom AND nom_specialite = %s AND
            code_ue IS NULL AND effectif_max IS NULL LIMIT 1;
        """
        with connection.cursor() as cursor:
            cursor.execute(query, [nom])
            return None if cursor.rowcount == 0 else dict_fetchone(cursor)

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

    id_cours = models.BigAutoField(primary_key=True)
    ue = models.ForeignKey(
        UE, 
        db_column='code_ue', 
        on_delete=models.RESTRICT,
        related_name='cours',
        related_query_name='cours'
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
        related_query_name='cours',
        blank=True,
        null=True
    )
    jour = models.CharField(max_length=3, choices=DAYS_OF_THE_WEEK)
    heure_debut = models.TimeField()
    heure_fin = models.TimeField()
    is_td = models.BooleanField(default=False)
    is_virtuel = models.BooleanField(default=False)
    description = models.TextField(blank=True)

    @classmethod
    def get_cours(cls, code_ue):
        from .serializers import CoursSerializer

        query = "SELECT * FROM cours WHERE code_ue = %s;"
        raw_qs = cls.objects.raw(query, [code_ue])
        try:
            # Try to get first element in queryset
            raw_qs[0]
        except IndexError:
            return None

        serializer = CoursSerializer(raw_qs, many=True)
        res_list = json.loads(json.dumps(serializer.data))
        
        # Since code_ue is just one, we should get a list with a single element.
        return parse_cours_list(res_list)[0]

    def __str__(self):
        return str(self.ue)
        
    class Meta:
        db_table = 'cours'
        constraints = [
            # L'heure de fin du cours doit etre superieure a son heure de debut
            models.CheckConstraint(
                check=models.Q(heure_fin__gt=models.F('heure_debut')),
                name='check_heure_fin_gt_heure_debut'
            ),
            # On ne doit pas avoir le meme enseignant dans deux salles differentes
            # le meme jour et a la meme heure
            models.UniqueConstraint(
                fields=['enseignant', 'salle', 'jour', 'heure_debut', 'heure_fin'],
                name='unique_enseignant_salle_jour_heure'
            )
        ]


class Regroupement(models.Model):
    id_regroupement = models.BigAutoField(primary_key=True)
    ue = models.ForeignKey(
        UE,
        on_delete=models.RESTRICT,
        db_column='code_ue',
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
    # Use CASCADE here rather than setting to null so as not to
    # liberate space and not to confuse with fields that initially had null values.
    specialite = models.ForeignKey(
        Specialite, 
        on_delete=models.CASCADE,
        db_column='nom_specialite',
        related_name='regroupements',
        related_query_name='regroupement',
        blank=True,
        null=True
    )
    groupe = models.ForeignKey(
        Groupe, 
        on_delete=models.CASCADE,
        db_column='nom_groupe',
        related_name='regroupements',
        related_query_name='regroupement',
        blank=True, 
        null=True
    )
    effectif_max = models.PositiveIntegerField(null=True, blank=True)

    @classmethod
    def get_regroupement(cls, id):
        query = "SELECT * FROM regroupement WHERE id_regroupement = %s LIMIT 1;"
        
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
        db_table = 'regroupement'

