# from django.apps import apps
# from rest_framework import status
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# from ..serializers import (
#    EnseignantSerializer, FiliereSerializer,
#    NiveauSerializer, SalleSerializer,
#    UESerializer
# )


<<<<<<< HEAD
@api_view(['GET'])
def all_entries(request, model: str):
   def get_serializer_cls_and_table(model: str):
      if model == 'Enseignant':
         return EnseignantSerializer, 'enseignant'
      if model == 'Filiere':
         return FiliereSerializer, 'filiere'
      elif model == 'Niveau':
         return NiveauSerializer, 'niveau'
      elif model == 'Salle':
         return SalleSerializer, 'salle'
      # elif model == 'UE':
      #    return UESerializer, 'ue'
=======
# @api_view(['GET'])
# def all_entries(request, model: str):
#    def get_serializer_cls_and_table(model: str):
#       # if model == 'Enseignant':
#       #    return EnseignantSerializer, 'enseignant'
#       if model == 'Filiere':
#          return FiliereSerializer, 'filiere'
#       elif model == 'Niveau':
#          return NiveauSerializer, 'niveau'
#       elif model == 'Salle':
#          return SalleSerializer, 'salle'
#       # elif model == 'UE':
#       #    return UESerializer, 'ue'
>>>>>>> 686da007641d52e946bf7b7dd78f9622b569343f


#    valid_models = ['Enseignant', 'Filiere', 'Niveau', 'Salle']
#    if model not in valid_models:
#       return Response(
#          {'message': f'Invalid model, valid models are {valid_models}'}, 
#          status.HTTP_400_BAD_REQUEST
#       )

<<<<<<< HEAD
   
   Model = apps.get_model('time_table', model)
   SerializerClass, table_name = get_serializer_cls_and_table(model)
   query = "SELECT * FROM %s;" % table_name
   result = Model.objects.raw(query)
   serializer = SerializerClass(result, many=True)
=======
#    query = "SELECT * FROM %s;"
#    Model = apps.get_model('time_table', model)
#    SerializerClass, table_name = get_serializer_cls_and_table(model)

#    result = Model.objects.raw(query, [table_name])
#    serializer = SerializerClass(result, many=True)
>>>>>>> 686da007641d52e946bf7b7dd78f9622b569343f

#    return Response(serializer.data)

