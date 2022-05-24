from django.contrib.auth.models import AbstractUser
from django.db import connection
from django.db.utils import IntegrityError


class FiliereOps:
	def ajouter_filiere(self, nom):
		query = "INSERT INTO filiere (nom) VALUES (%s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError as err:
			print(err)
			return False
		
		return True

	def supprimer_filiere(self, nom):
		query = "DELETE FROM filiere WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError:
			return False
		
		return True

	def renommer_filiere(self, nom, new_nom):
		query = "UPDATE filiere SET nom = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom, nom])
		except IntegrityError:
			return False
		
		return True


class SpecialiteOps:
	def ajouter_specialite(self, nom):
		query = "INSERT INTO specialite (nom) VALUES (%s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError as err:
			print(err)
			return False
		
		return True

	def supprimer_specialite(self, nom):
		query = "DELETE FROM specialite WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError:
			return False
		
		return True

	def renommer_specialite(self, nom, new_nom):
		query = "UPDATE specialite SET nom = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom, nom])
		except IntegrityError:
			return False
		
		return True


class GroupeOps:
	def ajouter_groupe(self, nom):
		query = "INSERT INTO groupe (nom) VALUES (%s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError as err:
			print(err)
			return False
		
		return True

	def supprimer_groupe(self, nom):
		query = "DELETE FROM groupe WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError:
			return False
		
		return True

	def renommer_groupe(self, nom, new_nom):
		query = "UPDATE groupe SET nom = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom, nom])
		except IntegrityError:
			return False
		
		return True


class EnseignantOps:
	def ajouter_enseignant(self, matricule, nom, prenom):
		query = "INSERT INTO enseignant (matricule, nom, prenom) VALUES (%s, %s, %s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [matricule, nom, prenom])
		except IntegrityError as err:
			print(err)
			return False
		
		return True

	def supprimer_enseignant(self, matricule):
		query = "DELETE FROM enseignant WHERE matricule = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [matricule])
		except IntegrityError:
			return False
		
		return True

	def modifier_enseignant(self, matricule, new_matricule, new_nom, new_prenom):
		query = """
			UPDATE enseignant SET matricule = %s,
			nom = %s, prenom = %s
			WHERE matricule = %s;
		"""

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_matricule, new_nom, new_prenom, matricule])
		except IntegrityError:
			return False
		
		return True


class UEOps:
	def ajouter_ue(self, code, intitule):
		query = "INSERT INTO ue (code, intitule) VALUES (%s, %s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [code, intitule])
		except IntegrityError as err:
			print(err)
			return False
		
		return True

	def supprimer_ue(self, code):
		query = "DELETE FROM ue WHERE code = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [code])
		except IntegrityError:
			return False
		
		return True

	def modifier_ue(self, code, new_code, new_intitule):
		query = "UPDATE ue SET code = %s, intitule = %s, WHERE code = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_code, new_intitule, code])
		except IntegrityError:
			return False
		
		return True


class CoursOps:
	def ajouter_cours(self, code_ue, matricule_ens, nom_salle, jour, heure_debut, heure_fin, is_td):
		query = """
			INSERT INTO 
			cours (code_ue, matricule_enseignant, nom_salle, jour, heure_debut, heure_fin, td) 
			VALUES (%s, %s, %s, %s, %s, %s, %d);
		"""
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(
					query, 
					[code_ue, matricule_ens, nom_salle, jour, heure_debut, heure_fin, is_td]
				)
		except IntegrityError as err:
			print(err)
			return False
		
		return True

	def supprimer_cours(self, code_ue):
		query = "DELETE FROM cours WHERE code_ue = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [code_ue])
		except IntegrityError:
			return False
		
		return True

	def modifier_cours(
		self, code_ue, new_code_ue, new_matricule_ens, new_nom_salle, 
		new_jour, new_heure_debut, new_heure_fin, new_is_td
	):
		query = """
			UPDATE cours SET code_ue = %s,
			matricule_enseignant = %s, nom_salle = %s,
			jour = %s, heure_debut = %s, heure_fin = %s,
			td = %d
			WHERE code_ue = %s;
		"""

		try: 
			with connection.cursor() as cursor:
				cursor.execute(
					query, 
					[
						new_code_ue, new_matricule_ens, new_nom_salle, new_jour, 
						new_heure_debut, new_heure_fin, new_is_td, code_ue
					]
				)
		except IntegrityError:
			return False
		
		return True


class User(AbstractUser, FiliereOps, SpecialiteOps, GroupeOps, EnseignantOps, UEOps, CoursOps):
	pass

