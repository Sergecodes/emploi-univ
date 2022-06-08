from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import UE
from ..utils import get_cud_response, is_valid_request, dict_fetchall


class UEList(APIView):
   def post(self, request):
      user, POST = request.user, request.data
      valid_req = is_valid_request(POST, ['code', 'intitule', 'nom_filiere', 'nom_niveau'])

      if valid_req[0] == False:
         return valid_req[1]

      nom_filiere, nom_niveau = POST['nom_filiere'], POST['nom_niveau']
      code, nom_specialite = POST['code'], POST.get('nom_specialite')
      intitule = POST['intitule']
      res = user.ajouter_ue(code, intitule, nom_filiere, nom_niveau, nom_specialite)
      return get_cud_response(res, success_code=status.HTTP_201_CREATED)
      
   def get(self, request):
      query = """
        select code , intitule, nom_niveau, nom_filiere, nom_specialite from regroupement, ue where regroupement.code_ue=ue.code;
      """
      with connection.cursor() as cursor:
         cursor.execute(query)
         return Response(dict_fetchall(cursor))


class UEDetail(APIView):
   def get(self, request, code):
      return Response(UE.get_ue(code))

   def put(self, request, code):
      user, PUT = request.user, request.data
      new_code, new_intitule = PUT.get('new_code', ''), PUT.get('intitule', '')
      res = user.modifier_ue(code, new_code, new_intitule)
      return get_cud_response(res)

   def delete(self, request, code):
      res = request.user.supprimer_ue(code)
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)


