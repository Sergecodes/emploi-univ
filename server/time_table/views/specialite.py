from django.db import connection, transaction
from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import FiliereForm, SpecialiteForm, NiveauForm
from ..models import Regroupement
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
      form = SpecialiteForm(POST)

      if form.is_valid():
         try:
            with transaction.atomic():
               res = user.ajouter_specialite(nom_specialite)

               query = """
                  INSERT INTO regroupement 
                  (nom_filiere, nom_niveau, nom_specialite) 
                  VALUES (%s, %s, %s)
               """   

               with connection.cursor() as cursor:
                  cursor.execute(query, [nom_filiere, nom_niveau, nom_specialite])

         except IntegrityError as err:
            return Response(str(err), status.HTTP_500_INTERNAL_SERVER_ERROR)

         return get_cud_response(return_code=status.HTTP_201_CREATED)
      
      return Response(form.errors, status.HTTP_400_BAD_REQUEST)

   def get(self, request, nom):
      query = """
         SELECT nom_specialite, nom_filiere, nom_niveau FROM regroupement
         WHERE nom_specialite = %s LIMIT 1;
      """
      try:
         res = Regroupement.objects.raw(query, [nom])[0]
      except IndexError:
         return Response({}, status.HTTP_404_NOT_FOUND)
         
      return Response(res)

   def put(self, request):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(
         POST, 
         [
            'nom_specialite', 'new_nom_specialite',
            'new_nom_filiere', 'new_nom_niveau'
         ]
      )

      if valid_req[0] == False:
         return valid_req[1]

      nom_specialite = POST['nom_specialite']
      new_nom_specialite = POST['new_nom_specialite']
      new_nom_filiere, new_nom_niveau = POST['new_nom_filiere'], POST['new_nom_niveau']
      
      spec_form = SpecialiteForm({ 'nom': new_nom_specialite })
      fil_form = FiliereForm({ 'nom': new_nom_filiere })
      niv_form = NiveauForm({ 'nom': new_nom_niveau })

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

      try:
         with transaction.atomic():
            res = user.renommer_specialite(nom_specialite, new_nom_specialite)

            query = """
               UPDATE regroupement SET nom_specialite = %s
               WHERE nom_specialite = %s
            """   

            with connection.cursor() as cursor:
               cursor.execute(query, [new_nom_specialite, nom_specialite])

      except IntegrityError as err:
         return Response(str(err), status.HTTP_500_INTERNAL_SERVER_ERROR)

      return get_cud_response()


   def delete(self, request):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(
         POST, 
         ['nom_filiere', 'nom_specialite', 'nom_niveau']
      )

      if valid_req[0] == False:
         return valid_req[1]

      nom_niveau, nom_filiere = POST['nom_niveau'], POST['nom_filiere']
      nom_specialite = POST['nom_specialite']

      try:
         with transaction.atomic():
            res = user.supprimer_specialite(POST['nom_specialite'])
            query = """
               DELETE FROM regroupement WHERE nom_filiere = %s, 
               nom_niveau = %s, nom_specialite = %s;
            """

            with connection.cursor() as cursor:
               cursor.execute(
                  query, 
                  [nom_filiere, nom_niveau, nom_specialite]
               )
      except IntegrityError as err:
         # Use 404 cause it's the only error we can have here
         return Response(str(err), status.HTTP_404_NOT_FOUND)

      return get_cud_response(return_code=status.HTTP_204_NO_CONTENT)


