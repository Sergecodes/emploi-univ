import json
from django.db import connection
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Cours
from ..serializers import CoursSerializer
from ..utils import (
   get_cud_response, is_valid_request, parse_cours_list
)


@api_view(['GET'])
def cours_by_fil_niv_special(request, nom_filiere, nom_niveau, nom_specialite=None):
   if not nom_specialite:
      query = """
         SELECT DISTINCT nom_specialite, id_cours, cours.code_ue, intitule, matricule_ens, is_td,
         ens.nom AS nom_ens, ens.prenom AS prenom_ens, salle.nom AS nom_salle, jour, 
         heure_debut, heure_fin FROM cours, ue, enseignant AS ens, salle, regroupement reg
         WHERE cours.code_ue = ue.code AND salle.nom = cours.nom_salle AND cours.code_ue = reg.code_ue AND
         cours.matricule_ens = ens.matricule AND reg.nom_filiere = %s AND reg.nom_niveau = %s;
      """

      raw_qs = Cours.objects.raw(query, [nom_filiere, nom_niveau])
      serializer = CoursSerializer(raw_qs, many=True)
      res_list = json.loads(json.dumps(serializer.data))
      parsed_list = parse_cours_list(res_list)

      # Add specialite to cours dict
      i = 0
      for cours_dict in parsed_list:
         code = cours_dict['ue']['code']

         # Use i to optimize loop by reducing length of query...
         for cours in raw_qs[i:]:
            i += 1
            if code == cours.ue_id:
               # We have access to nom_specialite from cours because we included
               # it in the query (and passed to raw manager method...)
               cours_dict['specialite'] = {'nom': cours.nom_specialite}
               break
            
      return Response(parsed_list)      
   else:
      query = """
         SELECT DISTINCT id_cours, cours.code_ue, intitule, matricule_ens, is_td,
         ens.nom AS nom_ens, ens.prenom AS prenom_ens, salle.nom AS nom_salle, jour, 
         heure_debut, heure_fin FROM cours, ue, enseignant AS ens, salle, regroupement reg
         WHERE cours.code_ue = ue.code AND cours.code_ue = reg.code_ue AND salle.nom = cours.nom_salle AND
         cours.matricule_ens = ens.matricule AND reg.nom_filiere = %s AND reg.nom_niveau = %s
         AND reg.nom_specialite = %s;
      """
   
      raw_qs = Cours.objects.raw(query, [nom_filiere, nom_niveau, nom_specialite])
      serializer = CoursSerializer(raw_qs, many=True)
      res_list = json.loads(json.dumps(serializer.data))
      return Response(parse_cours_list(res_list))   


class CoursList(APIView):
   def post(self, request):
      """
      `enseignants` is array of matricule enseignants, `jour`: {LUN, MAR, ..., DIM},
      `heure_debut` and `heure_fin` e.g. 9h55
      """
      user, POST = request.user, request.data
      is_virtuel = POST.get('is_virtuel')

      if not is_virtuel:
         is_td = POST.get('is_td', False)

         if is_td:
            valid_req = is_valid_request(
               POST, 
               ['code_ue', 'nom_salle', 'jour', 'heure_debut', 'heure_fin']
            )
         else:
            valid_req = is_valid_request(
               POST, 
               ['code_ue', 'nom_salle', 'jour', 'heure_debut', 'heure_fin', 'enseignants']
            )

         if valid_req[0] == False:
            return valid_req[1]

         if is_td:
            res = user.ajouter_td(
               POST['code_ue'], POST['nom_salle'], POST['jour'], POST['heure_debut'], 
               POST['heure_fin'], POST.get('description', '')
            )
         else:
            res = user.ajouter_cours_normal(
               POST['code_ue'], POST['enseignants'], 
               POST['nom_salle'], POST['jour'], POST['heure_debut'], 
               POST['heure_fin'], POST.get('description', '')
            )
      else:
         valid_req = is_valid_request(
            POST, ['jour', 'heure_debut', 'heure_fin', 'nom_niveau', 'nom_filiere', 'description']
         )

         if valid_req[0] == False:
            return valid_req[1]

         res = user.ajouter_cours_virtuel(
            POST['jour'], POST['heure_debut'], POST['heure_fin'], 
            POST['nom_niveau'], POST['nom_filiere'], POST['description'] 
         )

      return get_cud_response(res, success_code=status.HTTP_201_CREATED)

   def get(self, request):
      query = "SELECT * FROM cours;"
      raw_qs = Cours.objects.raw(query)
      serializer = CoursSerializer(raw_qs, many=True)
      res_list = json.loads(json.dumps(serializer.data))
      print(res_list)
      return Response(parse_cours_list(res_list))


class CoursDetail(APIView):
   def get(self, request, code_ue):
      res = Cours.get_cours(code_ue)
      if not res:
         return Response(res, status.HTTP_404_NOT_FOUND)

      return Response(res)

   def put(self, request, code_ue):
      user, PUT = request.user, request.data

      new_enseignants = PUT.get('new_enseignants', [])
      new_nom_salle, new_is_td = PUT.get('new_nom_salle'), PUT.get('new_is_td')
      new_jour, new_heure_debut = PUT.get('new_jour'), PUT.get('new_heure_debut')
      new_heure_fin, new_code_ue = PUT.get('new_heure_fin'), PUT.get('new_code_ue')

      res = user.modifier_cours(
         code_ue, new_code_ue, new_enseignants, new_nom_salle, 
         new_jour, new_heure_debut, new_heure_fin, new_is_td
      )
      return get_cud_response(res)

   def delete(self, request, code_ue):
      res = request.user.supprimer_cours(code_ue)  
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)



# @api_view(['GET'])
# def cours_by_filiere(request, nom_filiere):
#    """
#    Get cours info. i.e. code_ue, intitule, matricule_ens, nom_ens, prenom_ens,
#    nom_salle, heure_debut, heure_fin, jour, is_td, nom_niveau, nom_specialite. \n
#    Use tables: cours, ue, enseignant, regroupement, filiere.
#    """

#    def group_by_niveau(cursor):
#       """
#       Return cours grouped by niveau i.e each key of the dict should be a niveau.
#       `cursor` should have used a GROUP BY clause.
#       """
#       columns = [col[0] for col in cursor.description]
#       result_1 = [dict(zip(columns, row)) for row in cursor.fetchall()]
#       result = {"L1": [], "L2": [], "L3": [], "M1": []}

#       for res_dict in result_1:
#          # Get and remove `nom_niveau` from dict
#          nom_niveau = res_dict.pop('nom_niveau').upper()

#          arr = result[nom_niveau].append(res_dict)
#          result[nom_niveau] = arr

#       return result
      
   
#    query = """
#       SELECT DISTINCT nom_niveau, cours.code_ue, intitule, matricule_ens, ens.nom AS nom_ens, 
#       ens.prenom AS prenom_ens, salle.nom AS nom_salle, jour, is_td
#       heure_debut, heure_fin, nom_specialite FROM regroupement AS reg, 
#       cours, ue, enseignant AS ens, salle, filiere WHERE cours.code_ue = ue.code AND 
#       cours.matricule_ens = ens.matricule AND cours.code_ue = reg.code_ue AND 
#       ue.code = reg.code_ue AND reg.nom_filiere = filiere.nom AND 
#       filiere.nom = %s;
#    """
   
#    with connection.cursor() as cursor:
#       cursor.execute(query, [nom_filiere])
#       return Response(dict_fetchall(cursor))





