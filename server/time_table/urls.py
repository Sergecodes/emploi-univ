from django.urls import path, include

from .views import cours as cours_views
from .views import enseignant as ens_views
from .views import filiere as filiere_views
from .views import niveau as niveau_views
from .views import salle as salle_views
from .views import specialite as spec_views
from .views import ue as ue_views
from .views import misc as misc_views
# from .views import common as common_views
from .views import groupe as groupe_views


app_name = 'time_table'


cours_urls = [
   path('', cours_views.CoursList.as_view()),
   path('filieres/<str:nom_filiere>/', cours_views.cours_by_filiere),
   path(
      'filieres/<str:nom_filiere>/<str:nom_niveau>/',
      cours_views.cours_by_fil_niv_special
   ),
   path(
      'filieres/<str:nom_filiere>/<str:nom_niveau>/<str:nom_specialite>/',
      cours_views.cours_by_fil_niv_special
   ),
   path('<str:code_ue>/', cours_views.CoursDetail.as_view()),
]

enseignant_urls = [
   path('', ens_views.EnseignantList.as_view()),
   path('filieres/<str:nom_filiere>/', ens_views.enseignants_by_filiere),
   path('filieres/<str:nom_niveau>/', ens_views.enseignants_by_niveau),
   path('<str:matricule>/', ens_views.EnseignantDetail.as_view()),
]

filiere_urls = [
   path('', filiere_views.FiliereList.as_view()),
   path('<str:nom>/', filiere_views.FiliereDetail.as_view()),
]

salle_urls = [
   path('', salle_views.SalleList.as_view()),
   path('<str:nom>/', salle_views.SalleDetail.as_view()),
]

specialite_urls = [
   path('', spec_views.SpecialiteList.as_view()),
   path('<str:nom>/', spec_views.SpecialiteDetail.as_view()),
   path('<str:nom_filiere>/<str:nom_niveau>/', spec_views.specialites_by_niveau_filiere)
]

groupe_urls = [
   path('', groupe_views.GroupeList.as_view()),
   path('<str:nom_filiere>/<str:nom_niveau>/', groupe_views.groupes_by_niveau_filiere),
   path('<str:nom>/', groupe_views.GroupeDetail.as_view()),
]

ue_urls = [
   path('', ue_views.UEList.as_view()),
   path('<str:code>/', ue_views.UEDetail.as_view()),
]

niveau_urls = [
   path('', niveau_views.NiveauList.as_view()),
   # path('<str:nom_bref>/', niveau_views.NiveauCRUD.as_view()),
]

misc_urls = [
   path(
      'set-filiere-niveau-capacite/<str:nom_filiere>/<str:nom_niveau>/', 
      misc_views.set_filiere_niveau_capacite
   ),
   path(
      'get-filiere-niveau-capacite/<str:nom_filiere>/<str:nom_niveau>/', 
      misc_views.get_filiere_niveau_capacite
   )
]


urlpatterns = [
   path('', include(misc_urls)),
   path('cours/', include(cours_urls)),
   path('enseignants/', include(enseignant_urls)),
   path('filieres/', include(filiere_urls)),
   path('niveaux/', include(niveau_urls)),
   path('salles/', include(salle_urls)),
   path('specialites/', include(specialite_urls)),
   path('groupes/', include(groupe_urls)),
   path('ue/', include(ue_urls)),

   # path('<str:model>/all/', common_views.all_entries, name='all-entries'),
]

