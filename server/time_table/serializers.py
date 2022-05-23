from rest_framework.serializers import ModelSerializer

from .models import (
   Enseignant, Cours, Filiere,
   Groupe, RegroupementUE, Salle, 
   Specialite, UE, Niveau
)


class EnseignantSerializer(ModelSerializer):
   class Meta:
      model = Enseignant
      fields = '__all__'


class NiveauSerializer(ModelSerializer):
   class Meta:
      model = Niveau
      fields = '__all__'


class CoursSerializer(ModelSerializer):
   # TODO ensure serializer also populates related objects (especially enseignant)
   class Meta:
      model = Cours
      fields = '__all__'


class FiliereSerializer(ModelSerializer):
   class Meta:
      model = Filiere
      fields = '__all__'


class GroupeSerializer(ModelSerializer):
   class Meta:
      model = Groupe
      fields = '__all__'


class SpecialiteSerializer(ModelSerializer):
   class Meta:
      model = Specialite
      fields = '__all__'


class UESerializer(ModelSerializer):
   class Meta:
      model = UE
      fields = '__all__'


class SalleSerializer(ModelSerializer):
   class Meta:
      model = Salle
      fields = '__all__'


# class RegroupementUESerializer(ModelSerializer):
#    class Meta:
#       model = RegroupementUE
#       fields = '__all__'


