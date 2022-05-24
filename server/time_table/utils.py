from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.response import Response
from typing import Iterable


def dict_fetchone(cursor):
   """
   Return all rows from a cursor as a dict.
   """
   columns = [col[0] for col in cursor.description]
   return dict(zip(columns, cursor.fetchone())) 


def dict_fetchall(cursor):
   """
   Return all rows from a cursor as a dict.
   Taken from https://docs.djangoproject.com/en/4.0/topics/db/sql. 
   """
   columns = [col[0] for col in cursor.description]
   return [dict(zip(columns, row)) for row in cursor.fetchall()]
   

def is_valid_request(query_dict, params: Iterable[str]):
   """Verify if all elements of params are in the request"""
   for param in params:
      if param not in query_dict:
         return (
            False,  
            Response(
               f'{param} is missing in the request body',
               status.HTTP_400_BAD_REQUEST
            )
         )

   return True, None

def get_cud_response(op_result: IntegrityError | None = None, return_code=None, message=''):
   """Get response to send after performing a CUD Operation"""

   if isinstance(op_result, IntegrityError):
      return Response(
         str(op_result), 
         return_code or status.HTTP_500_INTERNAL_SERVER_ERROR
      )

   return Response(message, return_code or status.HTTP_200_OK)


def get_read_response(r_result: any | None, serializer_cls):
   """Get response to send after performin a Read (select/find) operation"""
   if r_result is None:
      return Response({}, status.HTTP_404_NOT_FOUND)

   serializer = serializer_cls(r_result)
   return Response(serializer.data)
