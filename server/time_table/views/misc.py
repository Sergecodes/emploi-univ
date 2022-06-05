from django.db import connection
from django.db.utils import IntegrityError
from rest_framework.decorators import api_view
from rest_framework.response import Response

from ..models import Regroupement
from ..serializers import RegroupementSerializer
from ..utils import is_valid_request, get_cud_response


@api_view(['PUT'])
def set_filiere_niveau_capacite(request, nom_filiere, nom_niveau):
   PUT = request.data
   valid_req = is_valid_request(PUT, ['effectif_max'])

   if valid_req[0] == False:
      return valid_req[1]

   select_q = """
      SELECT COUNT(*) FROM regroupement 
      WHERE nom_filiere = %s AND nom_niveau = %s AND effectif_max IS NOT NULL;
   """
   
   # Verify if there's already a field like this. If not, then insert it.
   # Else update. (basically an upsert)
   with connection.cursor() as cursor:
      cursor.execute(select_q, [nom_filiere, nom_niveau, PUT['effectif_max']])
      count1 = cursor.fetchone()[0]
      
   res = None
   if count1 == 0:
      query = """
         INSERT INTO regroupement (nom_filiere, nom_niveau, effectif_max) 
         VALUES (%s, %s, %s);
      """
      try:
         with connection.cursor() as cursor:
            cursor.execute(query, [nom_filiere, nom_niveau, PUT['effectif_max']])
      except IntegrityError as err:
         res = err 
   else:
      query = """
         UPDATE regroupement SET effectif_max = %s WHERE nom_filiere = %s 
         AND nom_niveau = %s AND effectif_max IS NOT NULL;
      """
      try:
         with connection.cursor() as cursor:
            cursor.execute(query, [PUT['effectif_max'], nom_filiere, nom_niveau])
            print(cursor.rowcount)
      except IntegrityError as err:
         res = err 

   return get_cud_response(res)


@api_view(['GET'])
def get_filiere_niveau_capacite(request, nom_filiere, nom_niveau):
   query = """
      SELECT id_regroupement, nom_filiere, nom_niveau, effectif_max FROM regroupement 
      WHERE nom_filiere = %s AND nom_niveau = %s AND effectif_max IS NOT NULL LIMIT 1;
   """
   res = Regroupement.objects.raw(query, [nom_filiere, nom_niveau])
   serializer = RegroupementSerializer(res)

   return Response(serializer.data)
