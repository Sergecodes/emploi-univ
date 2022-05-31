from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import FiliereForm, GroupeForm, NiveauForm
from ..models import Regroupement, Groupe
from ..serializers import RegroupementSerializer
from ..utils import get_cud_response, is_valid_request


# @api_view(['GET'])
# def all_specialites(request):
#    query = "SELECT DISTINCT nom_specialite, nom_filiere, nom_niveau FROM regroupement;"
#    res = Regroupement.objects.raw(query)
#    serializer = RegroupementSerializer(res, many=True)

#    return Response(serializer.data)


class GroupeCRUD(APIView):
   def post(self, request):
      user, POST = request.user, request.data
      valid_req = is_valid_request(
         POST, 
         ['nom_groupe', 'code_ue' 'nom_niveau', 'nom_filiere']
      )

      if valid_req[0] == False:
         return valid_req[1]

      nom_groupe = POST['nom_groupe']
      nom_filiere, nom_niveau = POST['nom_filiere'], POST['nom_niveau']
      code_ue, nom_specialite = POST['code_ue'], POST.get('nom_specialite')

      grp_form = GroupeForm({ 'nom': nom_groupe })
      fil_form = FiliereForm({ 'nom': nom_filiere })
      niv_form = NiveauForm({ 'nom': nom_niveau })

      if not grp_form.is_valid():
         return Response(
            {
               'message': 'Groupe form has errors',
               **grp_form.errors
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

      res = user.ajouter_groupe(
         nom_groupe, code_ue, nom_filiere, nom_niveau, nom_specialite
      )
      return get_cud_response(res, success_code=status.HTTP_201_CREATED)

   def get(self, request, nom):
      res = Groupe.get_groupe(nom)
      if res:
         data = {
            'nom_groupe': res.nom_groupe,
            'code_ue': res.code_ue,
            'nom_specialite': res.nom_specialite,
            'nom_filiere': res.nom_filiere,
            'nom_niveau': res.nom_niveau
         }
         return Response(data)

      return Response(status=status.HTTP_404_NOT_FOUND)

   def put(self, request, nom):
      user, POST = request.user, request.data
      valid_req = is_valid_request(POST, ['new_nom'])

      if valid_req[0] == False:
         return valid_req[1]

      new_nom = POST['new_nom']
      groupe_form = GroupeForm({ 'nom': new_nom })

      if not groupe_form.is_valid():
         return Response(
            {
               'message': 'Groupe form has errors',
               **groupe_form.errors
            }, 
            status.HTTP_400_BAD_REQUEST
         )

      res = user.renommer_groupe(nom, new_nom)
      return get_cud_response(res)

   def delete(self, request, nom):
      res = request.user.supprimer_groupe(nom)
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)


