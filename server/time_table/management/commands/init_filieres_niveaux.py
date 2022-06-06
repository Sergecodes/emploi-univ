from django.db.utils import IntegrityError
from django.db import connection, transaction
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
   help = 'Insert initial filieres and niveaux into database'

   def handle(self, *args, **options):
      filieres = ['Physique', 'Chimie', 'Mathématiques', 'Informatique']
      niveaux = [
         {'nom_bref': 'L1', 'nom_complet': 'Niveau 1'},
         {'nom_bref': 'L2', 'nom_complet': 'Niveau 2'},
         {'nom_bref': 'L3', 'nom_complet': 'Niveau 3'},
         {'nom_bref': 'M1', 'nom_complet': 'Master 1'},
      ]

      query1_start = "INSERT INTO filiere (nom) VALUES "
      query2_start = "INSERT INTO niveau (nom_bref, nom_complet) VALUES "
      query1_next, query2_next = "(%s), ", "(%s, %s, %s), "
      query1, query2 = query1_start, query2_start
      params1, params2 = [], []

      for nom_filiere in filieres:
         query1 += query1_next
         params1.extend([nom_filiere])

      for niveau_dict in niveaux:
         query2 += query2_next
         params2.extend([niveau_dict['nom_bref'], niveau_dict['nom_complet']])

      # Remove last ', ' from query strings (last two characters of `query2_next`)
      query1 = query1[:-2]
      query2 = query2[:-2]

      try:
         with transaction.atomic():
            with connection.cursor() as cursor:
               cursor.execute(query1, params1)

            with connection.cursor() as cursor:
               cursor.execute(query1, params2)
      except IntegrityError as err:
         raise CommandError(
            "There would be duplicate entries if this command were executed. "
            "Perhaps you've already run it... \n" 
            f"Anyways it says: {err}"
         )
      except Exception as e:
         raise CommandError(str(e))

      self.stdout.write(
         self.style.SUCCESS(
            f"Successfully inserted filieres {filieres} and niveaux {niveaux}"
         )
      )


