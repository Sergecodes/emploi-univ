from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db.utils import DataError, IntegrityError
from django.forms.utils import ErrorDict
from rest_framework import status
from rest_framework.response import Response
from typing import Iterable


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
   op_result: IntegrityError | IndexError | ErrorDict | DataError | 
      str | ObjectDoesNotExist | ValidationError | None = None, 
   success_code=None, 
   error_code=None,
   success_message=''
):
   """Get response to send after performing a CUD Operation"""

   if isinstance(op_result, IntegrityError):
      return Response(str(op_result), error_code or status.HTTP_409_CONFLICT)

   # Index error means no element was found in the results set,
   # so return 404 code
   elif isinstance(op_result, IndexError):
      return Response(str(op_result), error_code or status.HTTP_404_NOT_FOUND)

   # ErrorDict happens if error was from form validation (form.errors was passed)
   elif isinstance(op_result, ErrorDict):
      for field in op_result:
         message_arr = op_result[field]

         for message in message_arr:
            if 'already exists' in message:
               return Response(op_result, error_code or status.HTTP_409_CONFLICT)
         
      return Response(op_result, error_code or status.HTTP_400_BAD_REQUEST)

   # ObjectDoesNotExist is raised when the object was not found during an
   # update or delete query
   elif isinstance(op_result, ObjectDoesNotExist):
      return Response(str(op_result), error_code or status.HTTP_404_NOT_FOUND)

   elif isinstance(op_result, (ValidationError, DataError)):
      return Response(str(op_result), error_code or status.HTTP_400_BAD_REQUEST)

   return Response(op_result or success_message or "Success", success_code or status.HTTP_200_OK)


def get_read_response(r_result, serializer_cls):
   """Get response to send after performing a Read (select/find) operation"""

   if not r_result:
      return Response(r_result, status.HTTP_404_NOT_FOUND)

   serializer = serializer_cls(r_result)
   return Response(serializer.data)


def validate_cours_heure(heure: str):
   """`heure` should be of the form ahb where a is the hour and b the minutes"""
   hour, minute = heure.split('h')
   # TODO


def parse_cours_list(cours_list):
   """
   Convert list of cours dictionary to appropriate format. 
   Such as placing all enseignants in an array, grouping by code_ue etc..
   Data passed should be serialized(by CoursSerializer)
   """

   # Get enseignants of each code_ue
   code_enseignants = {}
   for cours_dict in cours_list:
      code_ue = cours_dict['ue']['code']

      if code_ue in code_enseignants:
         enseignants = code_enseignants[code_ue]
         enseignants.append(cours_dict['enseignant'])
         code_enseignants[code_ue] = enseignants
      else:
         code_enseignants[code_ue] = [cours_dict['enseignant']]

   # Now add enseignants to each cours info
   result_list = []
   traversed_codes = set()
   for cours_dict in cours_list:
      code_ue = cours_dict['ue']['code']

      if code_ue not in traversed_codes:
         result_list.append({
            'ue': cours_dict['ue'],
            'salle': cours_dict['salle'],
            'enseignants': code_enseignants[code_ue],
            'jour': cours_dict['jour'],
            'heure_debut': cours_dict['heure_debut'],
            'heure_fin': cours_dict['heure_fin'],
            'is_td': cours_dict['is_td'],
            'is_virtuel': cours_dict['is_virtuel'],
            'description': cours_dict['description'],
         })

      traversed_codes.add(code_ue)

   return result_list

