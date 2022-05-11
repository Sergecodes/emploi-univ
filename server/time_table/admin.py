from django.contrib import admin
from .models import (
    Cours, Enseignant, Filiere, 
    Niveau, Groupe, Salle, Specialite,
    RegroupementUE, UE
)


admin.site.register(Enseignant)
admin.site.register(Cours)
admin.site.register(Filiere)
admin.site.register(Niveau)
admin.site.register(Groupe)
admin.site.register(Salle)
admin.site.register(Specialite)
admin.site.register(UE)
admin.site.register(RegroupementUE)
