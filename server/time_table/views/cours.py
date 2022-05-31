from django.db import connection
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import CoursForm 
from ..models import Cours
from ..serializers import CoursSerializer
from ..utils import (
   get_cud_response, get_read_response, 
   is_valid_request, dict_fetchall
)


@api_view(['GET'])
def cours_by_filiere(request, nom_filiere):
   """
   Get cours info. i.e. code_ue, intitule, matricule_ens, nom_ens, prenom_ens,
   nom_salle, heure_debut, heure_fin, jour, is_td, nom_niveau, nom_specialite. \n
   Use tables: cours, ue, enseignant, regroupement, filiere.
   """

   def group_by_niveau(cursor):
      """
      Return cours grouped by niveau i.e each key of the dict should be a niveau.
      `cursor` should have used a GROUP BY clause.
      """
      columns = [col[0] for col in cursor.description]
      result_1 = [dict(zip(columns, row)) for row in cursor.fetchall()]
      result = {"L1": [], "L2": [], "L3": [], "M1": []}

      for res_dict in result_1:
         # Get and remove `nom_niveau` from dict
         nom_niveau = res_dict.pop('nom_niveau')

         arr = result[nom_niveau].append(res_dict)
         result[nom_niveau] = arr

      return result
   
   
   query = """
      SELECT DISTINCT nom_niveau, code_ue, intitule, matricule_ens, ens.nom AS nom_ens, 
      ens.prenom AS prenom_ens, salle.nom AS nom_salle, jour, is_td
      heure_debut, heure_fin, nom_specialite FROM regroupement AS reg, 
      cours, ue, enseignant AS ens, filiere WHERE cours.code_ue = ue.code AND 
      cours.matricule_ens = ens.matricule AND cours.code_ue = reg.code_ue AND 
      ue.code = reg.code_ue AND reg.nom_filiere = filiere.nom AND 
      filiere.nom = %s GROUP BY nom_niveau;
   """
   
   with connection.cursor() as cursor:
      cursor.execute(query, [nom_filiere])
      return Response(group_by_niveau(cursor))


@api_view(['GET'])
def cours_by_fil_niv_special(request, nom_filiere, nom_niveau, nom_specialite=None):
   if not nom_specialite:
      query = """
         SELECT DISTINCT nom_specialite, code_ue, intitule, matricule_ens, is_td,
         ens.nom AS nom_ens, ens.prenom AS prenom_ens, salle.nom AS nom_salle, jour, 
         heure_debut, heure_fin FROM cours, ue, enseignant AS ens, filiere, niveau,
         specialite AS spec WHERE cours.code_ue = ue.code AND 
         cours.matricule_ens = ens.matricule AND filiere.nom = %s AND niveau.nom = %s;
      """

      with connection.cursor() as cursor:
         cursor.execute(query, [nom_filiere, nom_niveau])
         res = dict_fetchall(cursor)
         return Response(res)      
   else:
      query = """
         SELECT DISTINCT code_ue, intitule, matricule_ens, ens.nom AS nom_ens, 
         ens.prenom AS prenom_ens, salle.nom AS nom_salle, jour, is_td
         heure_debut, heure_fin FROM cours, ue, enseignant AS ens, filiere, niveau, 
         specialite AS spec WHERE cours.code_ue = ue.code AND 
         cours.matricule_ens = ens.matricule AND filiere.nom = %s AND niveau.nom = %s 
         AND spec.nom = %s;
      """
   
      with connection.cursor() as cursor:
         cursor.execute(query, [nom_filiere, nom_niveau, nom_specialite])
         res = dict_fetchall(cursor)
         return Response(res)


class CoursCRUD(APIView):
   def post(self, request):
      user, POST = request.user, request.data
      valid_req = is_valid_request(
         POST, 
         ['code_ue', 'nom_salle', 'jour', 'heure_fin', 'heure_debut']
      )

      if valid_req[0] == False:
         return valid_req[1]

      code_ue, jour = POST['code_ue'], POST['jour']
      nom_salle, is_td = POST['nom_salle'], POST.get('is_td', False)
      heure_debut, heure_fin = POST['heure_debut'], POST['heure_fin']
      
      form = CoursForm(POST)

      if form.is_valid():
         res = user.ajouter_cours(code_ue, nom_salle, jour, heure_debut, heure_fin, is_td)
      else:
         res = form.errors

      return get_cud_response(res, success_code=status.HTTP_201_CREATED)

   def get(self, request, code_ue):
      res = Cours.get_cours(code_ue)
      return get_read_response(res, CoursSerializer)

   def put(self, request, code_ue):
      user, POST = request.user, request.data
      new_nom_salle, new_is_td = POST.get('new_nom_salle', ''), POST.get('new_is_td')
      new_jour, new_heure_debut = POST.get('new_jour', ''), POST.get('new_heure_debut')
      new_heure_fin, new_code_ue = POST.get('new_heure_fin'), POST.get('new_code_ue', '')

      res = user.modifier_cours(
         code_ue, new_code_ue, new_nom_salle, new_jour, 
         new_heure_debut, new_heure_fin, new_is_td
      )
      return get_cud_response(res)

   def delete(self, request, code_ue):
      res = request.user.supprimer_cours(code_ue)  
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)


