from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import SalleForm
from ..models import Salle
from ..serializers import SalleSerializer
from ..utils import get_cud_response, get_read_response, is_valid_request


class SalleCRUD(APIView):
   queryset = Salle.objects.all()
   
   def post(self, request):
      user, POST = request.user, request.POST
      form = SalleForm(POST)
      valid_req = is_valid_request(POST, ['nom', 'capacite'])

      if valid_req[0] == False:
         return valid_req[1]

      if form.is_valid():
         res = user.ajouter_salle(POST['nom', 'capacite'])
         return get_cud_response(res, status.HTTP_201_CREATED)
      
      return Response(form.errors, status.HTTP_400_BAD_REQUEST)

   def get(self, request, nom):
      res = Salle.get_salle(nom)
      return get_read_response(res, SalleSerializer)

   def put(self, request, nom):
      user, POST = request.user, request.POST
      new_nom, new_capacite = POST.get('new_nom'), POST.get('new_capacite')

      res = user.modifier_salle(nom, new_nom, new_capacite)
      return get_cud_response(res, status.HTTP_404_NOT_FOUND)

   def delete(self, request, nom):
      res = request.user.supprimer_salle(nom)

      # Or use `if res`
      if isinstance(res, IntegrityError):
         return get_cud_response(str(res), status.HTTP_404_NOT_FOUND)

      return get_cud_response(return_code=status.HTTP_204_NO_CONTENT)


