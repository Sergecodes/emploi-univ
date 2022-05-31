# from django.db.utils import IntegrityError
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView

# from ..forms import NiveauForm
# from ..models import Niveau
# from ..serializers import NiveauSerializer
# from ..utils import get_cud_response, get_read_response, is_valid_request


# class NiveauCRUD(APIView):
#    def post(self, request):
#       user, POST = request.user, request.POST
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
#       user, POST = request.user, request.POST
#       new_nom_bref = POST.get('new_nom_bref', '')
#       new_nom_complet = POST.get('new_nom_complet', '')

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


