from django.urls import path, include

from .views import cours as cours_views
from .views import enseignant as ens_views
from .views import filiere as filiere_views
# from .views import niveau as niveau_views
from .views import salle as salle_views
from .views import specialite as spec_views
from .views import ue as ue_views
from .views import common as common_views
from .views import groupe as groupe_views


app_name = 'time_table'


cours_urls = [
   path('', cours_views.CoursCRUD.as_view(), name='cours-create'),
   path('filieres/<str:nom_filiere>/', cours_views.cours_by_filiere, name='cours-filiere'),
   path(
      'filieres/<str:nom_filiere>/<str:nom_niveau>/<str:nom_specialite>/',
      cours_views.cours_by_fil_niv_special,
      name='cours-general'
   ),
   path('<str:code_ue>/', cours_views.CoursCRUD.as_view(), name='cours-rud'),
]

enseignant_urls = [
   path('', ens_views.EnseignantCRUD.as_view(), name='ens-create'),
   path('filieres/<str:nom_filiere>/', ens_views.enseignants_by_filiere, name='ens-filiere'),
   path('filieres/<str:nom_niveau>/', ens_views.enseignants_by_niveau, name='ens-niveau'),
   path('<str:matricule>/', ens_views.EnseignantCRUD.as_view(), name='ens-rud'),
]

filiere_urls = [
   path('', filiere_views.FiliereCRUD.as_view(), name='filiere-create'),
   path('<str:nom>/', filiere_views.FiliereCRUD.as_view(), name='filiere-rud'),
]

# niveau_urls = [
#    path('', niveau_views.NiveauCRUD.as_view(), name='niveau-create'),
#    path('<str:nom_bref>/', niveau_views.NiveauCRUD.as_view(), name='niveau-rud'),
# ]

salle_urls = [
   path('', salle_views.SalleCRUD.as_view(), name='salle-create'),
   path('<str:nom>/', salle_views.SalleCRUD.as_view(), name='salle-rud'),
]

specialite_urls = [
   path('', spec_views.SpecialiteList.as_view(), name='specialite-list'),
   path('<str:nom>/', spec_views.SpecialiteDetail.as_view(), name='specialite-detail'),
]

groupe_urls = [
   # path('', spec_views.all_specialites, name='all-specialite'),
   path('', groupe_views.GroupeCRUD.as_view(), name='groupe-create'),
   path('<str:nom>/', groupe_views.GroupeCRUD.as_view(), name='groupe-rud'),
]

ue_urls = [
   path('', ue_views.all_ue, name='all-ue'),
   path('', ue_views.UECRUD.as_view(), name='ue-create'),
   path('<str:code>/', ue_views.UECRUD.as_view(), name='ue-rud'),
]


urlpatterns = [
   path('cours/', include(cours_urls)),
   path('enseignants/', include(enseignant_urls)),
   path('filieres/', include(filiere_urls)),
   # path('niveaux/', include(niveau_urls)),
   path('salles/', include(salle_urls)),
   path('specialites/', include(specialite_urls)),
   path('groupes/', include(groupe_urls)),
   path('ue/', include(ue_urls)),
   path('<str:model>/all/', common_views.all_entries, name='all-entries'),

]

