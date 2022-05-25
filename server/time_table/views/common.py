from django.apps import apps
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..serializers import (
   EnseignantSerializer, FiliereSerializer,
   NiveauSerializer, SalleSerializer,
   UESerializer
)


@api_view(['GET'])
def all_entries(request, model: str):
   def get_serializer_cls_and_table(model: str):
      # if model == 'Enseignant':
      #    return EnseignantSerializer, 'enseignant'
      if model == 'Filiere':
         return FiliereSerializer, 'filiere'
      elif model == 'Niveau':
         return NiveauSerializer, 'niveau'
      elif model == 'Salle':
         return SalleSerializer, 'salle'
      # elif model == 'UE':
      #    return UESerializer, 'ue'


   valid_models = ['Enseignant', 'Filiere', 'Niveau', 'Salle']
   if model not in valid_models:
      return Response(
         {'message': f'Invalid model, valid models are {valid_models}'}, 
         status.HTTP_400_BAD_REQUEST
      )

   query = "SELECT * FROM %s;"
   Model = apps.get_model('time_table', model)
   SerializerClass, table_name = get_serializer_cls_and_table(model)

   result = Model.objects.raw(query, [table_name])
   serializer = SerializerClass(result, many=True)

   return Response(serializer.data)

