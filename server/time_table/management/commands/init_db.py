from decouple import config
from django.db.utils import IntegrityError
from django.db import connection, transaction
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
   help = 'Insert initial values like filieres and niveaux into database'

   def handle(self, *args, **options):
      USE_PROD_DB = config('USE_PROD_DB', cast=bool, default=False)
      filieres = ['Physique', 'Chimie', 'Mathématiques', 'Informatique']
      niveaux = [
         {'nom_bref': 'L1', 'nom_complet': 'Niveau 1'},
         {'nom_bref': 'L2', 'nom_complet': 'Niveau 2'},
         {'nom_bref': 'L3', 'nom_complet': 'Niveau 3'},
         {'nom_bref': 'M1', 'nom_complet': 'Master 1'},
      ]

      # If Oracle is used, since it does not support INSERT IGNORE clause, use the hint...
      if USE_PROD_DB:
         query1_start = """
            INSERT /*+ IGNORE_ROW_ON_DUPKEY_INDEX(filiere, nom) */ 
            INTO filiere (nom) VALUES 
         """
         query2_start = """
            INSERT /*+ IGNORE_ROW_ON_DUPKEY_INDEX(niveau, nom_bref) */ 
            INTO niveau (nom_bref, nom_complet) VALUES 
         """
         query3 = """
            INSERT /*+ IGNORE_ROW_ON_DUPKEY_INDEX(enseignant, matricule) */ 
            INTO enseignant (matricule, nom, prenom) VALUES (%s, %s, %s) 
         """
         query4 = """
            INSERT /*+ IGNORE_ROW_ON_DUPKEY_INDEX(salle, nom) */ 
            INTO salle (nom, capacite) VALUES (%s, %s) 
         """
      else:
         query1_start = "INSERT IGNORE INTO filiere (nom) VALUES "
         query2_start = "INSERT IGNORE INTO niveau (nom_bref, nom_complet) VALUES "
         query3 = "INSERT IGNORE INTO enseignant (matricule, nom, prenom) VALUES (%s, %s, %s)"
         query4 = "INSERT INTO salle (nom, capacite) VALUES (%s, %s)"

      query1_next, query2_next = "(%s), ", "(%s, %s), "
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
               cursor.execute(query2, params2)

            with connection.cursor() as cursor:
               # Filler for enseignant 
               cursor.execute(query3, ["000000", "000000", "000000"])

            with connection.cursor() as cursor:
               # Filler for salle 
               cursor.execute(query4, ["000000", "000000"])
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
            f"Successfully inserted filieres {filieres}, niveaux {niveaux} and filler salles and enseignants."
         )
      )


