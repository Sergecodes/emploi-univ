from rest_framework.serializers import ModelSerializer

from .models import (
   Enseignant, Cours, Filiere,
   Groupe, Regroupement, Salle, 
   Specialite, UE, Niveau
)


class EnseignantSerializer(ModelSerializer):
   class Meta:
      model = Enseignant
      fields = '__all__'


class RegroupementSerializer(ModelSerializer):
   class Meta:
      model = Regroupement
      fields = '__all__'
      depth = 1


class NiveauSerializer(ModelSerializer):
   class Meta:
      model = Niveau
      fields = '__all__'


class CoursSerializer(ModelSerializer):
   # TODO ensure serializer also populates related objects (especially enseignant)
   class Meta:
      model = Cours
      fields = '__all__'
      depth = 1

   def to_representation(self, instance):
      """Convert `heure_debut` and `heure_fin` to appropriate formats."""
      ret = super().to_representation(instance)
      print(ret)
      # ret['heure_debut'] = ret['heure_debut']
      return ret


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

