from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import FiliereForm, SpecialiteForm, NiveauForm
from ..models import Regroupement, Specialite
from ..serializers import RegroupementSerializer
from ..utils import get_cud_response, is_valid_request


@api_view(['GET'])
def all_specialites(request):
   query = "SELECT DISTINCT nom_specialite, nom_filiere, nom_niveau FROM regroupement;"
   res = Regroupement.objects.raw(query)
   serializer = RegroupementSerializer(res, many=True)

   return Response(serializer.data)


class SpecialiteCRUD(APIView):
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
      return get_cud_response(res, return_code=status.HTTP_201_CREATED)

   def get(self, request, nom):
      res = Specialite.get_specialite(nom)
      if res:
         data = {
            'nom_specialite': res.nom_specialite,
            'nom_filiere': res.nom_filiere,
            'nom_niveau': res.nom_niveau
         }
         return Response(data)

      return Response(status=status.HTTP_404_NOT_FOUND)

   def put(self, request, nom):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(POST, ['new_nom_specialite'])

      if valid_req[0] == False:
         return valid_req[1]

      new_nom_specialite = POST['new_nom_specialite']
      spec_form = SpecialiteForm({ 'nom': new_nom_specialite })

      if not spec_form.is_valid():
         return Response(
            {
               'message': 'Specialite form has errors',
               **spec_form.errors
            }, 
            status.HTTP_400_BAD_REQUEST
         )

      res = user.renommer_specialite(nom, new_nom_specialite)
      return get_cud_response(res, status.HTTP_404_NOT_FOUND)

   def delete(self, request, nom):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(
         POST, 
         ['nom_filiere', 'nom_niveau']
      )

      if valid_req[0] == False:
         return valid_req[1]

      nom_niveau, nom_filiere = POST['nom_niveau'], POST['nom_filiere']
      res = user.supprimer_specialite(nom, nom_niveau, nom_filiere)

      if isinstance(res, IntegrityError):
         # Use 404 cause it's the only error we can have here
         return Response(str(res), status.HTTP_404_NOT_FOUND)

      return get_cud_response(return_code=status.HTTP_204_NO_CONTENT)


