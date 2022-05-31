from rest_framework import status
from rest_framework.views import APIView

from ..forms import FiliereForm
from ..models import Filiere
from ..serializers import FiliereSerializer
from ..utils import get_cud_response, get_read_response, is_valid_request


class FiliereCRUD(APIView):
   def post(self, request):
      user, POST = request.user, request.POST
      form = FiliereForm(POST)
      valid_req = is_valid_request(POST, ['nom'])

      if valid_req[0] == False:
         return valid_req[1]

      if form.is_valid():
         res = user.ajouter_filiere(POST['nom'])
      else:
         res = form.errors

      return get_cud_response(res, success_code=status.HTTP_201_CREATED)

   def get(self, request, nom):
      res = Filiere.get_filiere(nom)
      return get_read_response(res, FiliereSerializer)

   def put(self, request, nom):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(POST, ['new_nom'])

      if valid_req[0] == False:
         return valid_req[1]

      new_nom = POST['new_nom']

      form = FiliereForm({ 'nom': new_nom })
      if form.is_valid():
         res = user.renommer_filiere(nom, new_nom)
      else:
         res = form.errors
      
      return get_cud_response(res)

   def delete(self, request, nom):
      res = request.user.supprimer_filiere(nom)
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)


