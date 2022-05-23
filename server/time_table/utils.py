from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.response import Response


def get_cud_response(op_result: IntegrityError | None, return_code=None):
   """Get response to send after performing a CUD Operation"""

   if isinstance(op_result, IntegrityError):
      if return_code is None:
         return Response(data=op_result, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

      return Response(data=op_result, status=return_code)

   return Response()


def get_read_response(r_result: any | None, serializer_cls):
   """Get response to send after performin a Read (select/find) operation"""
   if r_result is None:
      return Response(data={}, status=status.HTTP_404_NOT_FOUND)

   serializer = serializer_cls(r_result)
   return Response(data=serializer.data)
