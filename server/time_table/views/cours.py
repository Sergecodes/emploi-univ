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
      nom_specialite = POST.get('nom_specialite')
      
      form = CoursForm(POST)

      if form.is_valid():
         res = user.ajouter_cours(
            code_ue, matricule_ens, nom_salle, jour, heure_debut, heure_fin, 
            nom_filiere, nom_niveau, nom_specialite, is_td
         )

         return get_cud_response(res, return_code=status.HTTP_201_CREATED)
      
      return Response(form.errors, status.HTTP_400_BAD_REQUEST)

   def get(self, request, code_ue):
      res = Cours.get_cours(code_ue)
      return get_read_response(res, CoursSerializer)

   def put(self, request, code_ue):
      user, POST = request.user, request.POST

      new_nom_specialite = POST.get('new_nom_specialite', '')
      new_nom_salle, new_is_td = POST.get('new_nom_salle', ''), POST.get('new_is_td')
      new_jour, new_heure_debut = POST.get('new_jour', ''), POST.get('new_heure_debut')
      nom_filiere, nom_niveau = POST.get('nom_filiere', ''), POST.get('nom_niveau', '')
      nom_specialite, new_heure_fin = POST.get('nom_specialite'), POST.get('new_heure_fin')
      new_nom_filiere, new_nom_niveau = POST.get('new_nom_filiere', ''), POST.get('new_nom_niveau', '')
      new_matricule_ens, new_code_ue  = POST.get('new_matricule_ens', ''), POST.get('new_code_ue', '')

      res = user.modifier_cours(
         code_ue, nom_filiere, nom_niveau, nom_specialite,
         new_nom_filiere, new_nom_niveau, new_nom_specialite,
         new_code_ue, new_matricule_ens, new_nom_salle, 
         new_jour, new_heure_debut, new_heure_fin, new_is_td
      )
      return get_cud_response(res, status.HTTP_404_NOT_FOUND)

   def delete(self, request, code_ue):
      user, POST = request.user, request.POST
      valid_req = is_valid_request(
         POST, ['nom_filiere', 'nom_niveau']
      )

      if valid_req[0] == False:
         return valid_req[1]

      nom_niveau, nom_filiere = POST['nom_niveau'], POST['nom_filiere']
      nom_specialite = POST.get('nom_specialite')

      res = user.supprimer_cours(
         code_ue, nom_filiere, nom_niveau, nom_specialite
      )
            
      if isinstance(res, IntegrityError):
         # Use 404 cause it's the only error we can have here
         return Response(str(res), status.HTTP_404_NOT_FOUND)

      return get_cud_response(return_code=status.HTTP_204_NO_CONTENT)


