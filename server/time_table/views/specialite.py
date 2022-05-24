# from django.db.utils import IntegrityError
# from rest_framework import status
# from rest_framework.response import Response
# from rest_framework.views import APIView

# from ..forms import SpecialiteForm
# from ..models import Specialite
# from ..serializers import SpecialiteSerializer
# from ..utils import get_cud_response, get_read_response, is_valid_request


# class SpecialiteCRUD(APIView):
#    def post(self, request):
#       user, POST = request.user, request.POST
#       form = EnseignantForm(POST)
#       valid_req = is_valid_request(POST, ['matricule', 'nom', 'prenom'])

#       if valid_req[0] == False:
#          return valid_req[1]

#       if form.is_valid():
#          res = user.ajouter_enseignant(POST['matricule'], POST['nom'], POST['prenom'])
#          return get_cud_response(res, status.HTTP_201_CREATED)
      
#       return Response(form.errors, status.HTTP_400_BAD_REQUEST)

#    def get(self, request, matricule):
#       res = Enseignant.get_enseignant(matricule)
#       return get_read_response(res, EnseignantSerializer)

#    def put(self, request):
#       user, POST = request.user, request.POST
#       valid_req = is_valid_request(
#          POST, 
#          ['matricule', 'new_matricule', 'new_prenom', 'new_nom']
#       )

#       if valid_req[0] == False:
#          return valid_req[1]

#       matricule, new_matricule = POST['matricule'], POST['new_matricule']
#       new_nom, new_prenom = POST['new_nom'], POST['new_prenom']
      
#       form = EnseignantForm({
#          'matricule': new_matricule,
#          'nom': new_nom,
#          'prenom': new_prenom
#       })

#       if form.is_valid():
#          res = user.modifier_enseignant(matricule, new_matricule, new_nom, new_prenom)
#          return get_cud_response(res, status.HTTP_404_NOT_FOUND)

#       return Response(form.errors, status.HTTP_400_BAD_REQUEST)

#    def delete(self, request):
#       user, POST = request.user, request.POST
#       valid_req = is_valid_request(POST, ['matricule'])

#       if valid_req[0] == False:
#          return valid_req[1]

#       try:
#          res = user.supprimer_enseignant(POST['matricule'])
#       except IntegrityError as err:
#          # Use 404 cause we assume it's the only error we can have here
#          return Response(str(err), status.HTTP_404_NOT_FOUND)

#       return get_cud_response(return_code=status.HTTP_204_NO_CONTENT)


