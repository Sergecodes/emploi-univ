from django.forms import ModelForm

from .models import (
   Enseignant, Cours, Filiere,
   Groupe, Salle, Specialite, UE
)


class EnseignantForm(ModelForm):
   class Meta:
      model = Enseignant
      fields = '__all__'


class CoursForm(ModelForm):
   class Meta:
      model = Cours
      fields = '__all__'


class FiliereForm(ModelForm):
   class Meta:
      model = Filiere
      fields = '__all__'


class GroupeForm(ModelForm):
   class Meta:
      model = Groupe
      fields = '__all__'


class SpecialiteForm(ModelForm):
   class Meta:
      model = Specialite
      fields = '__all__'


class UEForm(ModelForm):
   class Meta:
      model = UE
      fields = '__all__'


class SalleForm(ModelForm):
   class Meta:
      model = Salle
      fields = '__all__'





