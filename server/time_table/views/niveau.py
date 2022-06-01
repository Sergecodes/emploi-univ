from rest_framework.response import Response
from rest_framework.views import APIView

from ..models import Niveau
from ..serializers import NiveauSerializer


class NiveauList(APIView):
   def get(self, request):
      query = "SELECT * FROM niveau;"
      res = Niveau.objects.raw(query)
      serializer = NiveauSerializer(res, many=True)

      return Response(serializer.data)


# class NiveauCRUD(APIView):
#    def post(self, request):
#       user, POST = request.user, request.data
#       form = NiveauForm(POST)
#       valid_req = is_valid_request(POST, ['nom'])

#       if valid_req[0] == False:
#          return valid_req[1]

#       if form.is_valid():
#          res = user.ajouter_niveau(POST['nom'])
#          return get_cud_response(res, status.HTTP_201_CREATED)
      
#       return Response(form.errors, status.HTTP_400_BAD_REQUEST)

#    def get(self, request, nom_bref):
#       res = Niveau.get_niveau(nom_bref)
#       return get_read_response(res, NiveauSerializer)

#    def put(self, request, nom_bref):
#       user, PUT = request.user, request.data
#       new_nom_bref = PUT.get('new_nom_bref', '')
#       new_nom_complet = PUT.get('new_nom_complet', '')

#       res = user.modifier_niveau(nom_bref, new_nom_bref, new_nom_complet)
#       return get_cud_response(res, status.HTTP_404_NOT_FOUND)
      
#    def delete(self, request, nom_bref):
#       res = request.user.supprimer_niveau(nom_bref)

#       return get_cud_response(
 #        op_result=res,
#        # error_code=status.HTTP_404_NOT_FOUND, 
#         success_code=status.HTTP_204_NO_CONTENT,
#        success_message="Deleted successfully!"
#      )


