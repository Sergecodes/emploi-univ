from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import CoursForm
from ..models import Cours
from ..serializers import CoursSerializer
from ..utils import get_cud_response, get_read_response



@api_view(['GET'])
def cours_by_niveau_filiere(request, nom_niveau, nom_filiere):
   query = """
      SELECT * FROM cours, regroupement_ue reg WHERE
      cours.code_ue = reg.code_ue AND 
      reg.nom_niveau = %s AND reg.nom_filiere = %s;
   """

   result = Cours.objects.raw(query, [nom_niveau, nom_filiere])
   serializer = CoursSerializer(result, many=True)
   
   return Response(data=serializer.data)


class CoursCRUD(APIView):

   def post(self, request):
      user, POST = request.user, request.POST
      form = CoursForm(POST)

      if form.is_valid():
         res = user.ajouter_cours(
            POST['code_ue'], POST['matricule_ens'], POST['nom_salle'],
            POST['jour'], POST['heure_debut'], POST['heure_fin'], POST['is_td']
         )
         return get_cud_response(res)
      
      return Response(data=form.errors, status=status.HTTP_400_BAD_REQUEST)

   def get(self, request, code_ue):
      res = Cours.get_cours(code_ue)
      return get_read_response(res, CoursSerializer)

   def put(self, request):
      # request body should contain: matricule, new_matricule, new_nom, new_prenom
      user, POST = request.user, request.POST
      code_ue, new_code_ue = POST.code_ue, POST.new_code_ue
      new_matricule_ens, new_nom_salle, new_jour = POST.new_matricule_ens, POST.new_nom_salle, POST.new_jour
      new_heure_debut, new_heure_fin, new_is_td = POST.new_heure_debut, POST.new_heure_fin, POST.new_is_td

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
         res = user.modifier_cours(
            code_ue, new_code_ue, new_matricule_ens, new_nom_salle, 
		      new_jour, new_heure_debut, new_heure_fin, new_is_td
         )
         return get_cud_response(res, status.HTTP_404_NOT_FOUND)

      return Response(data=form.errors, status=status.HTTP_400_BAD_REQUEST)

   def delete(self, request):
      user, POST = request.user, request.POST
      res = user.supprimer_cours(POST.code_ue)
      return get_cud_response(res, status.HTTP_404_NOT_FOUND)


