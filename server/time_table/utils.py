from django.core.exceptions import ObjectDoesNotExist
from django.db.utils import IntegrityError
from django.forms.utils import ErrorDict
from rest_framework import status
from rest_framework.response import Response
from typing import Any, Iterable


def dict_fetchone(cursor):
   """
   Return row from a cursor as a dict.
   """
   columns = [col[0] for col in cursor.description]
   return dict(zip(columns, cursor.fetchone())) 


def dict_fetchall(cursor):
   """
   Return all rows from a cursor as a list of dicts.
   Taken from https://docs.djangoproject.com/en/4.0/topics/db/sql. 
   """
   columns = [col[0] for col in cursor.description]
   return [
      dict(zip(columns, row)) 
      for row in cursor.fetchall()
   ]
   

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


def get_cud_response(
   op_result: IntegrityError | IndexError | ErrorDict | str | ObjectDoesNotExist | None = None, 
   success_code=None, 
   error_code=None,
   success_message=''
):
   """Get response to send after performing a CUD Operation"""

   if isinstance(op_result, IntegrityError):
      return Response(str(op_result), error_code or status.HTTP_500_INTERNAL_SERVER_ERROR)

   # Index error means no element was found in the results set,
   # so return 404 code
   elif isinstance(op_result, IndexError):
      return Response(str(op_result), error_code or status.HTTP_404_NOT_FOUND)

   # ErrorDict happens if error was from form validation (form.errors was passed)
   elif isinstance(op_result, ErrorDict):
      return Response(op_result, error_code or status.HTTP_400_BAD_REQUEST)

   # ObjectDoesNotExist is raised when the object was not found during an
   # update or delete query
   elif isinstance(op_result, ObjectDoesNotExist):
      return Response(str(op_result), error_code or status.HTTP_404_NOT_FOUND)

   return Response(op_result or success_message or "Success", success_code or status.HTTP_200_OK)


def get_read_response(r_result: Any | None, serializer_cls):
   """Get response to send after performing a Read (select/find) operation"""
   if r_result is None:
      return Response({}, status.HTTP_404_NOT_FOUND)

   serializer = serializer_cls(r_result)
   return Response(serializer.data)
