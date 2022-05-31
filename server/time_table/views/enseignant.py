from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import EnseignantForm
from ..models import Enseignant
from ..serializers import EnseignantSerializer
from ..utils import get_cud_response, get_read_response, is_valid_request


@api_view(['GET'])
def enseignants_by_filiere(request, nom_filiere):
   # Pour relier une filiere a ses enseignants, on suit la voie
   # filiere -> regroupement -> cours -> enseignant
   #     (nom_filiere)     (code_ue)   (matricule)
   # puis on filtre par le nom de la filiere
   query = """
      SELECT ens.matricule, ens.nom, ens.prenom 
      FROM filiere fil, regroupement reg, cours, enseignants ens WHERE 
      fil.nom = reg.nom_filiere AND reg.code_ue = cours.code_ue AND
      cours.matricule_ens = ens.matricule AND fil.nom = %s;
   """
   result = Enseignant.objects.raw(query, [nom_filiere])
   serializer = EnseignantSerializer(result, many=True)
   
   return Response(serializer.data)


@api_view(['GET'])
def enseignants_by_niveau(request, nom_niveau):
   # Pour relier une niveau a ses enseignants, on suit la voie
   # niveau -> regroupement -> cours -> enseignant
   #  (nom_bref = nom_niveau) (code_ue)  (matricule)
   # puis on filtre par le nom du niveau
   query = """
      SELECT ens.matricule, ens.nom, ens.prenom 
      FROM niveau niv, regroupement reg, cours, enseignants ens WHERE 
      niv.nom_bref = reg.nom_niveau AND reg.code_ue = cours.code_ue AND
      cours.matricule_ens = ens.matricule AND niv.nom_bref = %s;
   """
   result = Enseignant.objects.raw(query, [nom_niveau])
   serializer = EnseignantSerializer(result, many=True)
   
   return Response(serializer.data)


class EnseignantCRUD(APIView):
   def post(self, request):
      user, POST = request.user, request.data
      form = EnseignantForm(POST)
      valid_req = is_valid_request(POST, ['matricule', 'nom', 'prenom'])

      if valid_req[0] == False:
         return valid_req[1]

      if form.is_valid():
         res = user.ajouter_enseignant(POST['matricule'], POST['nom'], POST['prenom'])
      else:
         res = form.errors

      return get_cud_response(res, success_code=status.HTTP_201_CREATED)

   def get(self, request, matricule):
      res = Enseignant.get_enseignant(matricule)
      return get_read_response(res, EnseignantSerializer)

   def put(self, request, matricule):
      user, POST = request.user, request.data
      new_matricule = POST.get('new_matricule', '')
      new_nom, new_prenom = POST.get('new_nom', ''), POST.get('new_prenom', '')

      res = user.modifier_enseignant(matricule, new_matricule, new_nom, new_prenom)
      return get_cud_response(res)

   def delete(self, request, matricule):
      res = request.user.supprimer_enseignant(matricule)
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)


