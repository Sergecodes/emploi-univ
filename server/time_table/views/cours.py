from django.db import connection, transaction
from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import CoursForm 
from ..models import Cours
from ..serializers import CoursSerializer
from ..utils import get_cud_response, get_read_response, is_valid_request



@api_view(['GET'])
def cours_by_niveau_filiere(request, nom_niveau, nom_filiere):
   query = """
      SELECT * FROM cours, regroupement reg WHERE
      cours.code_ue = reg.code_ue AND 
      reg.nom_niveau = %s AND reg.nom_filiere = %s;
   """

   result = Cours.objects.raw(query, [nom_niveau, nom_filiere])
   serializer = CoursSerializer(result, many=True)
   
   return Response(serializer.data)


class CoursCRUD(APIView):

   def post(self, request):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(
         POST, 
         [
            'code_ue', 'matricule_ens', 'nom_salle', 'jour', 
            'heure_fin', 'nom_filiere', 'nom_niveau', 'heure_debut',
         ]
      )

      if valid_req[0] == False:
         return valid_req[1]

      code_ue, matricule_ens  = POST['code_ue'], POST['matricule_ens']
      nom_salle, is_td = POST['nom_salle'], POST.get('is_td', False)
      jour, heure_debut, heure_fin = POST['jour'], POST['heure_debut'], POST['heure_fin']
      nom_filiere, nom_niveau = POST['nom_filiere'], POST['nom_niveau']
      nom_specialite, nom_groupe = POST.get('nom_specialite'), POST.get('nom_groupe')
      form = CoursForm(POST)

      if form.is_valid():
         try:
            with transaction.atomic():
               res = user.ajouter_cours(
                  code_ue, matricule_ens, nom_salle,
                  jour, heure_debut, heure_fin, is_td
               )

               query = """
                  INSERT INTO regroupement 
                  (code_ue, nom_filiere, nom_niveau, nom_specialite, nom_groupe) 
                  VALUES (%s, %s, %s, %s, %s)
               """   

               with connection.cursor() as cursor:
                  cursor.execute(
                     query, 
                     [code_ue, nom_filiere, nom_niveau, nom_specialite, nom_groupe]
                  )

         except IntegrityError as err:
            return Response(str(err), status.HTTP_500_INTERNAL_SERVER_ERROR)

         return get_cud_response(return_code=status.HTTP_201_CREATED)
      
      return Response(form.errors, status.HTTP_400_BAD_REQUEST)

   def get(self, request, code_ue):
      res = Cours.get_cours(code_ue)
      return get_read_response(res, CoursSerializer)

   def put(self, request):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(
         POST, 
         [
            'code_ue', 'new_matricule_ens', 'new_nom_salle', 'new_jour', 
            'new_heure_fin', 'nom_filiere', 'nom_niveau', 'new_heure_debut',
            'new_nom_filiere', 'new_nom_niveau'
         ]
      )

      if valid_req[0] == False:
         return valid_req[1]

      code_ue, new_matricule_ens = POST['code_ue'], POST['new_matricule_ens']
      new_nom_salle, new_is_td = POST['new_nom_salle'], POST.get('new_is_td', False)
      new_jour, new_heure_debut = POST['new_jour'], POST['new_heure_debut']
      nom_filiere, nom_niveau = POST['nom_filiere'], POST['nom_niveau']
      nom_specialite, nom_groupe = POST.get('nom_specialite'), POST.get('nom_groupe')
      new_nom_filiere, new_nom_niveau = POST['new_nom_filiere'], POST['new_nom_niveau']
      new_heure_fin, new_nom_groupe = POST['new_heure_fin'], POST.get('new_nom_groupe')
      new_nom_specialite, new_code_ue  = POST.get('new_nom_specialite'), POST['new_code_ue']
      
      form = CoursForm({
         'ue': new_code_ue,
         'enseignant': new_matricule_ens,
         'salle': new_nom_salle,
         'jour': new_jour,
         'heure_debut': new_heure_debut,
         'heure_fin': new_heure_fin,
         'is_td': new_is_td
      })

      if form.is_valid():
         try:
            with transaction.atomic():
               res = user.modifier_cours(
                  code_ue, new_code_ue, new_matricule_ens, new_nom_salle, 
                  new_jour, new_heure_debut, new_heure_fin, new_is_td
               )

               query = """
                  UPDATE regroupement SET
                  code_ue = %s, nom_filiere = %s, nom_niveau = %s,
                  nom_specialite = %s, nom_groupe = %s WHERE
                  code_ue = %s, nom_filiere = %s, nom_niveau = %s
                  nom_groupe = %s, nom_specialite = %s
               """   

               with connection.cursor() as cursor:
                  cursor.execute(
                     query, 
                     [
                        new_code_ue, new_nom_filiere, new_nom_niveau, new_nom_specialite,
                        new_nom_groupe, code_ue, nom_filiere, nom_niveau, nom_groupe,
                        nom_specialite
                     ]
                  )

         except IntegrityError as err:
            return Response(str(err), status.HTTP_500_INTERNAL_SERVER_ERROR)

         return get_cud_response()

      return Response(form.errors, status.HTTP_400_BAD_REQUEST)

   def delete(self, request):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(
         POST, 
         [
            'code_ue', 'nom_filiere', 'nom_groupe', 
            'nom_filiere', 'nom_specialite', 'nom_niveau'
         ]
      )

      if valid_req[0] == False:
         return valid_req[1]

      code_ue, nom_groupe = POST['code_ue'], POST['nom_groupe']
      nom_niveau, nom_filiere = POST['nom_niveau'], POST['nom_filiere']
      nom_specialite = POST['nom_specialite']

      try:
         with transaction.atomic():
            res = user.supprimer_cours(POST.code_ue)
            query = """
               DELETE FROM regroupement WHERE nom_filiere = %s, code_ue = %s,
               nom_niveau = %s, nom_groupe = %s, nom_specialite = %s;
            """

            with connection.cursor() as cursor:
               cursor.execute(
                  query, 
                  [nom_filiere, code_ue, nom_niveau, nom_groupe, nom_specialite]
               )
      except IntegrityError as err:
         # Use 404 cause it's the only error we can have here
         return Response(str(err), status.HTTP_404_NOT_FOUND)

      return get_cud_response(return_code=status.HTTP_204_NO_CONTENT)


