from django.db import connection, transaction
from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import FiliereForm, SpecialiteForm, NiveauForm, UEForm, EnseignantForm
from ..models import UE
from ..utils import get_cud_response, is_valid_request, dict_fetchall


@api_view(['GET'])
def all_ue(request):
   query = """
      SELECT nom_ue, intitule, matricule_enseignant, enseignant.nom AS nom_enseignant, 
      enseignant.prenom AS prenom_ens, nom_filiere, nom_niveau, nom_specialite 
      FROM regroupement, cours, enseignant WHERE regroupement.code_ue = cours.code_ue 
      AND cours.matricule_ens = enseignant.matricule;
   """
   with connection.cursor() as cursor:
      cursor.execute(query)
      return Response(dict_fetchall(cursor))


class UECRUD(APIView):
   def post(self, request):
      user, POST = request.user, request.data
      valid_req = is_valid_request(
         POST, 
         [
            'code', 'intitule', 'matricule_ens', 
            'nom_filiere', 'nom_niveau'
         ]
      )

      if valid_req[0] == False:
         return valid_req[1]

      nom_filiere, nom_niveau = POST['nom_filiere'], POST['nom_niveau']
      intitule, matricule_ens = POST['intitule'], POST['matricule_ens']
      code, nom_specialite = POST['code'], POST.get('nom_specialite')

      if nom_specialite:
         spec_form = SpecialiteForm({ 'nom': nom_specialite })

         if not spec_form.is_valid():
            return Response(
               {
                  'message': 'Specialite form has errors',
                  **spec_form.errors
               }, 
               status.HTTP_400_BAD_REQUEST
            )

      fil_form = FiliereForm({ 'nom': nom_filiere })
      niv_form = NiveauForm({ 'nom': nom_niveau })

      if not fil_form.is_valid():
         return Response(
            {
               'message': 'Filiere form has errors',
               **fil_form.errors
            }, 
            status.HTTP_400_BAD_REQUEST
         )

      if not niv_form.is_valid():
         return Response(
            {
               'message': 'Niveau form has errors',
               **niv_form.errors
            }, 
            status.HTTP_400_BAD_REQUEST
         )

      res = user.ajouter_ue(
         code, intitule, matricule_ens, nom_filiere,
         nom_niveau, nom_specialite
      )
      return get_cud_response(res, success_code=status.HTTP_201_CREATED)
      
   def get(self, request, code):
      return Response(UE.get_ue(code))

   def put(self, request, code):
      user, POST = request.user, request.data
      new_code, new_intitule = POST.get('new_code', ''), POST.get('intitule', '')
      res = user.modifier_ue(code, new_code, new_intitule)
      return get_cud_response(res)

   def delete(self, request, code):
      res = request.user.supprimer_specialite(code)
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)


