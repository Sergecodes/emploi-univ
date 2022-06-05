from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from ..forms import GroupeForm
from ..models import Regroupement, Groupe
from ..serializers import RegroupementSerializer
from ..utils import get_cud_response, is_valid_request


@api_view(['GET'])
def groupes_by_niveau_filiere(self, request, nom_filiere, nom_niveau):
   query = """
      SELECT DISTINCT id_regroupement, nom_groupe, nom_filiere, nom_niveau,
      nom_specialite FROM regroupement WHERE nom_filiere = %s AND nom_niveau = %s;
   """
   res = Regroupement.objects.raw(query, [nom_filiere, nom_niveau])
   serializer = RegroupementSerializer(res, many=True)

   return Response(serializer.data)


class GroupeList(APIView):
   def post(self, request):
      def check_valid_request():
         """
         Request should contain `nom_filiere`, `nom_niveau`, optional `nom_specialite`
         and `groupes` array (array of group names).
         """
         
         POST = request.data
         if 'nom_filiere' not in POST or 'nom_niveau' not in POST or 'groupes' not in POST:
            return False, Response(
               "'nom_filiere' or 'nom_niveau' or 'groupes' array not in request body",
               status.HTTP_400_BAD_REQUEST
            )

         return True, None


      user, POST = request.user, request.data
      valid_req = check_valid_request()

      if valid_req[0] == False:
         return valid_req[1]

      res = user.ajouter_multiple_groupes(
         POST['nom_filiere'], POST['nom_niveau'], 
         POST['groupes'], POST.get('nom_specialite')
      )
      return get_cud_response(res, success_code=status.HTTP_201_CREATED)

   def get(self, request):
      query = """
         SELECT DISTINCT id_regroupement, nom_groupe, nom_filiere, nom_niveau,
         nom_specialite FROM regroupement WHERE nom_groupe IS NOT NULL;
      """
      res = Regroupement.objects.raw(query)
      serializer = RegroupementSerializer(res, many=True)

      return Response(serializer.data)


class GroupeDetail(APIView):
   def delete(self, request, nom):
      user, DELETE = request.user, request.data
      valid_req = is_valid_request(DELETE, ['nom_niveau', 'nom_filiere'])

      if valid_req[0] == False:
         return valid_req[1]

      res = user.supprimer_groupe(
         nom, DELETE['nom_filiere'], DELETE['nom_niveau'], DELETE.get('nom_specialite')
      )
      return get_cud_response(res, success_code=status.HTTP_204_NO_CONTENT)

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
      user, PUT = request.user, request.data
      valid_req = is_valid_request(PUT, ['new_nom', 'nom_niveau', 'nom_filiere'])

      if valid_req[0] == False:
         return valid_req[1]

      res = user.renommer_groupe(
         nom, PUT['new_nom'], PUT['nom_niveau'], 
         PUT['nom_filiere'], PUT.get('nom_specialite')
      )
      return get_cud_response(res)