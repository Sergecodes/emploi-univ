from django.core.exceptions import ValidationError
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Enseignant
from .serializers import EnseignantSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def all_enseignants(request):
   query = "SELECT * FROM enseignants;"
   result = Enseignant.objects.raw(query)
   serializer = EnseignantSerializer(result, many=True)

   return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def enseignants_by_filiere(request, nom_filiere):
   
   return Response(status=status.HTTP_204_NO_CONTENT)


