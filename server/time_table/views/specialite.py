from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import SpecialiteForm
from ..models import Specialite
from ..utils import get_cud_response, is_valid_request, dict_fetchall


class SpecialiteList(APIView):
   def post(self, request):
      def check_valid_request():
         """
         Request should contain `nom_filiere` and `specialites` array with
         `nom`, `bool master` and `bool licence`.
         """
         print(request.data)
         POST = request.data
         if 'nom_filiere' not in POST or 'specialites' not in POST:
            return False, Response(
               "'nom_filiere' or 'specialites' array not in request body",
               status.HTTP_400_BAD_REQUEST
            )

         specials = POST['specialites']
         for special in specials:
            try:
               special['nom']
               special['master']
               special['licence']
            except KeyError:
               return False, Response(
                  f"Invalid specialite object in array ({special})",
                  status.HTTP_400_BAD_REQUEST
               )

         return True, None


      user, POST = request.user, request.data
      valid_req = check_valid_request()

      if valid_req[0] == False:
         return valid_req[1]

      res = user.ajouter_multiple_specialites(POST['nom_filiere'], POST['specialites'])
      return get_cud_response(res, success_code=status.HTTP_201_CREATED)

   def get(self, request):
      query = """
         SELECT DISTINCT id_regroupement, nom_specialite, nom_filiere, 
         nom_niveau FROM regroupement reg, specialite spec WHERE reg.nom_specialite = spec.nom;
      """
      with connection.cursor() as cursor:
         cursor.execute(query)
         return Response(dict_fetchall(cursor))


class SpecialiteDetail(APIView):
   def get(self, request, nom):
      res = Specialite.get_specialite(nom)
      return Response(res) if res else Response(status=status.HTTP_404_NOT_FOUND)

   def put(self, request, nom):
      user, PUT = request.user, request.data
      valid_req = is_valid_request(PUT, ['new_nom'])

      if valid_req[0] == False:
         return valid_req[1]

      new_nom = PUT['new_nom']
      spec_form = SpecialiteForm({ 'nom': new_nom })

      if not spec_form.is_valid():
         return Response(
            {
               'message': 'Specialite form has errors',
               **spec_form.errors
            }, 
            status.HTTP_400_BAD_REQUEST
         )

      res = user.renommer_specialite(nom, new_nom)
      return get_cud_response(res)

   def delete(self, request, nom):
      user, DELETE = request.user, request.data
      valid_req = is_valid_request(DELETE, ['licence', 'master'])

      if valid_req[0] == False:
         return valid_req[1]

      res = user.supprimer_specialite(nom, DELETE['licence'], DELETE['master'])
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)


'''
def post(self, request):
   user, POST = request.user, request.POST
   valid_req = is_valid_request(POST, ['nom_specialite', 'nom_niveau', 'nom_filiere'])

   if valid_req[0] == False:
      return valid_req[1]

   nom_filiere, nom_niveau = POST['nom_filiere'], POST['nom_niveau']
   nom_specialite = POST['nom_specialite']

   spec_form = SpecialiteForm({ 'nom': nom_specialite })
   fil_form = FiliereForm({ 'nom': nom_filiere })
   niv_form = NiveauForm({ 'nom': nom_niveau })

   if not spec_form.is_valid():
      return Response(
         {
            'message': 'Specialite form has errors',
            **spec_form.errors
         }, 
         status.HTTP_400_BAD_REQUEST
      )

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

   res = user.ajouter_specialite(nom_specialite, nom_niveau, nom_filiere)
   return get_cud_response(res, success_code=status.HTTP_201_CREATED)

'''