from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import SalleForm
from ..models import Salle
from ..serializers import SalleSerializer
from ..utils import get_cud_response, get_read_response, is_valid_request


class SalleList(APIView):
   def post(self, request):
      
      user, POST = request.user, request.data
      form = SalleForm(POST)
      valid_req = is_valid_request(POST, ['nom', 'capacite'])

      if valid_req[0] == False:
         return valid_req[1]

      if form.is_valid():
<<<<<<< HEAD
        res = user.ajouter_salle(POST['nom'], POST['capacite'])
      else:
         res = form.errors
      print(res)
=======
         res = user.ajouter_salle(POST['nom'], POST['capacite'])
      else:
         res = form.errors
      
>>>>>>> 686da007641d52e946bf7b7dd78f9622b569343f
      return get_cud_response(res, success_code=status.HTTP_201_CREATED)

   def get(self, request):
      query = "SELECT * FROM salle;"
      res = Salle.objects.raw(query)
      serializer = SalleSerializer(res, many=True)
      return Response(serializer.data)


class SalleDetail(APIView):
   def get(self, request, nom):
      res = Salle.get_salle(nom)
      return get_read_response(res, SalleSerializer)

   def put(self, request, nom):
<<<<<<< HEAD
      print(request.data)
      print('dans le post')
      user, POST = request.user, request.data
      new_nom, new_capacite = POST.get('new_nom'), POST.get('new_capacite')
=======
      user, PUT = request.user, request.data
      new_nom, new_capacite = PUT.get('new_nom'), PUT.get('new_capacite')
>>>>>>> 686da007641d52e946bf7b7dd78f9622b569343f

      res = user.modifier_salle(nom, new_nom, new_capacite)
      return get_cud_response(res)

   def delete(self, request, nom):
      res = request.user.supprimer_salle(nom)
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)


