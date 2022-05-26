from django.contrib.auth.models import AbstractUser
from django.db import connection, transaction
from django.db.utils import IntegrityError

from time_table.models import UE, Cours, Enseignant, Niveau, Salle


class FiliereOps:
	def ajouter_filiere(self, nom):
		query = "INSERT INTO filiere (nom) VALUES (%s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError as err:
			return err

	def supprimer_filiere(self, nom):
		query1 = "DELETE FROM regroupement WHERE nom_filiere = %s;"
		query2 = "DELETE FROM filiere WHERE nom = %s;"

		try: 
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [nom])

				with connection.cursor() as cursor:
					cursor.execute(query2, [nom])
		except IntegrityError as err:
			return err

	def renommer_filiere(self, nom, new_nom):
		if nom == new_nom:
			return 

		query = "UPDATE filiere SET nom = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom, nom])
		except IntegrityError as err:
			return err


class SpecialiteOps:
	def ajouter_specialite(self, nom, nom_niveau, nom_filiere):
		query1 = "INSERT INTO specialite (nom) VALUES (%s);"
		query2 = """
			INSERT INTO regroupement (nom_filiere, nom_niveau, nom_specialite) 
			VALUES (%s, %s, %s);
		"""
		
		try:
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [nom])

				with connection.cursor() as cursor:
					cursor.execute(query2, [nom_filiere, nom_niveau, nom])
		except IntegrityError as err:
			return err

	def supprimer_specialite(self, nom):
		query = "DELETE FROM specialite WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError as err:
			return err

	def renommer_specialite(self, nom, new_nom):
		if nom == new_nom:
			return

		query = "UPDATE specialite SET nom = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom, nom])
		except IntegrityError as err:
			return err


class GroupeOps:
	def ajouter_groupe(self, nom, code_ue, nom_filiere, nom_niveau, nom_specialite=None):
		query1 = "INSERT INTO groupe (nom) VALUES (%s);"
		query2 = """
			INSERT INTO regroupement(code_ue, nom_filiere, nom_niveau, nom_groupe, nom_specialite)
			VALUE (%s, %s, %s, %s, %s);
		"""
		
		try:
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [nom])

				with connection.cursor() as cursor:
					cursor.execute(query2, [code_ue, nom_filiere, nom_niveau, nom, nom_specialite])
		except IntegrityError as err:
			return err

	def supprimer_groupe(self, nom):
		query = "DELETE FROM groupe WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [nom])
		except IntegrityError as err:
			return err

	def renommer_groupe(self, nom, new_nom):
		if nom == new_nom:
			return

		query = "UPDATE groupe SET nom = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom, nom])
		except IntegrityError as err:
			return err


class SalleOps:
	def ajouter_salle(self, nom, capacite):
		query = "INSERT INTO salle (nom, capacite) VALUES (%s, %s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [nom, capacite])
		except IntegrityError as err:
			return err

	def supprimer_salle(self, nom):
		query1 = "DELETE FROM cours WHERE nom_salle = %s;"
		query2 = "DELETE FROM salle WHERE nom = %s;"

		try: 
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [nom])
				
				with connection.cursor() as cursor:
					cursor.execute(query2, [nom])
		except IntegrityError as err:
			return err

	def modifier_salle(self, nom, new_nom='', new_capacite=0):
		if not any([new_nom, new_capacite]):
			return

		select_salle = "SELECT * FROM salle WHERE nom = %s LIMIT 1;"
		try:
			salle = Salle.objects.raw(select_salle, [nom])[0]
		except IndexError:
			return IndexError(f"Salle with nom {nom} not found")

		query = "UPDATE salle SET nom = %s, capacite = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom or salle.nom, new_capacite or salle.capacite, nom])
		except IntegrityError as err:
			return err


class EnseignantOps:
	def ajouter_enseignant(self, matricule, nom, prenom):
		query = "INSERT INTO enseignant (matricule, nom, prenom) VALUES (%s, %s, %s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [matricule, nom, prenom])
		except IntegrityError as err:
			return err	
			
	def supprimer_enseignant(self, matricule):
		query1 = "DELETE FROM cours WHERE matricule_ens = %s;"
		query2 = "DELETE FROM enseignant WHERE matricule = %s;"

		try: 
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [matricule])
					
				with connection.cursor() as cursor:
					cursor.execute(query2, [matricule])
		except IntegrityError as err:
			return err

	def modifier_enseignant(self, matricule, new_matricule='', new_nom='', new_prenom=''):
		"""
		Parameters that don't need any modifications shouldn't be passed. 
		They will be set to None or ''
		"""
		# That means we don't want to change any info
		if not any([new_matricule, new_nom, new_prenom]):
			return

		select_ens = "SELECT * FROM enseignant WHERE matricule = %s LIMIT 1;"
		try:
			ens = Enseignant.objects.raw(select_ens, [matricule])[0]
		except IndexError:
			return IndexError(f"Enseignant with matricule {matricule} not found")
			
		query = """
			UPDATE enseignant SET matricule = %s, nom = %s, prenom = %s
			WHERE matricule = %s;
		"""

		try: 
			with connection.cursor() as cursor:
				cursor.execute(
					query, 
					[
						new_matricule or ens.matricule, new_nom or ens.nom, 
						new_prenom or ens.prenom, matricule
					]
				)
		except IntegrityError as err:
			return err


class UEOps:
	def ajouter_ue(
		self, code, intitule, matricule_ens, 
		nom_filiere, nom_niveau, nom_specialite=None
	):
		query1 = "INSERT INTO ue (code, intitule) VALUES (%s, %s);"
		query2 = "INSERT INTO cours (code_ue, matricule_ens) VALUES (%s, %s);"
		query3 = """
			INSERT INTO regroupement (code_ue, nom_filiere, nom_niveau, nom_specialite) 
			VALUES (%s, %s, %s, %s);
		"""
		
		try:
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [code, intitule])

				with connection.cursor() as cursor:
					cursor.execute(query2, [code, matricule_ens])

				with connection.cursor() as cursor:
					cursor.execute(query3, [code, nom_filiere, nom_niveau, nom_specialite])
		except IntegrityError as err:
			return err

	def supprimer_ue(self, code):
		query1 = "DELETE FROM cours WHERE code_ue = %s;"
		query2 = "DELETE FROM regroupement WHERE code_ue = %s;"
		query3 = "DELETE FROM ue WHERE code = %s;"

		try: 
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [code])

				with connection.cursor() as cursor:
					cursor.execute(query2, [code])

				with connection.cursor() as cursor:
					cursor.execute(query3, [code])
		except IntegrityError as err:
			return err

	def modifier_ue(self, code, new_code='', new_intitule=''):
		if not any([new_code, new_intitule]):
			return

		select_ue = "SELECT * FROM ue WHERE code = %s LIMIT 1;"
		try:
			ue = UE.objects.raw(select_ue, [code])[0]
		except IndexError:
			return IndexError(f"UE with code {code} not found")

		query = "UPDATE ue SET code = %s, intitule = %s WHERE code = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(
					query, 
					[new_code or ue.code, new_intitule or ue.intitule, code]
				)
		except IntegrityError as err:
			return err


class CoursOps:
	def ajouter_cours(
		self, code_ue, nom_salle, jour, 
		heure_debut, heure_fin, is_td=None
	):
		# Recall that when UE is added, a Cours is created containing only the
		# code_ue and matricule_ens. 

		query = """
			UPDATE cours SET nom_salle = %s, jour = %s, 
			heure_debut = %s, heure_fin = %s, is_td = %s 
			WHERE code_ue = %s;
		"""

		try:
			with connection.cursor() as cursor:
				cursor.execute(
					query, 
					[nom_salle, jour, heure_debut, heure_fin, is_td, code_ue]
				)
		except IntegrityError as err:
			return err

	def supprimer_cours(self, code_ue):
		query1 = "DELETE FROM regroupement WHERE code_ue = %s;"
		query2 = "DELETE FROM cours WHERE code_ue = %s;"

		try: 
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [code_ue])

				with connection.cursor() as cursor:
					cursor.execute(query2, [code_ue])
		except IntegrityError as err:
			return err

	def modifier_cours(
		self, code_ue, new_code_ue='', new_nom_salle='', new_jour=None, 
		new_heure_debut=None, new_heure_fin=None, new_is_td=None
	):
		# If no data wants to be modified
		if not any([
			new_code_ue, new_nom_salle, new_jour, 
			new_heure_debut, new_heure_fin, new_is_td
		]):
			return

		select_cours = "SELECT * FROM cours WHERE code_ue = %s LIMIT 1;"
		try:
			cours = Cours.objects.raw(select_cours, [code_ue])[0]
		except IndexError:
			return IndexError(f"Cours with code {code_ue} not found")

		query1 = """
			UPDATE cours SET code_ue = %s, nom_salle = %s, jour = %s, 
			heure_debut = %s, heure_fin = %s, is_td = %s WHERE code_ue = %s;
		"""

		try: 
			jour, heure_debut = cours.jour, cours.heure_debut
			heure_fin, nom_salle, is_td = cours.nom_salle, cours.is_td, cours.heure_fin

			# Use or in these params so as to maintain the old values if no new value 
			# was passed
			with connection.cursor() as cursor:
				cursor.execute(
					query1, 
					[
						new_code_ue or code_ue, new_nom_salle or nom_salle, 
						new_jour or jour, new_heure_debut or heure_debut, 
						new_heure_fin or heure_fin, new_is_td or is_td, code_ue
					]
				)
		except IntegrityError as err:
			return err


class User(
	AbstractUser, FiliereOps, SpecialiteOps, GroupeOps, 
	EnseignantOps, UEOps, CoursOps, SalleOps
):
	pass


'''
class NiveauOps:
	def ajouter_niveau(self, nom_bref, nom_complet):
		query = "INSERT INTO niveau (nom_bref, nom_complet) VALUES (%s, %s);"
		
		try:
			with connection.cursor() as cursor:
				cursor.execute(query, [nom_bref, nom_complet])
		except IntegrityError as err:
			return err

	def supprimer_niveau(self, nom_bref):
		query1 = "DELETE FROM regroupement WHERE nom_niveau = %s;"
		query2 = "DELETE FROM niveau WHERE nom_bref = %s;"

		try: 
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [nom_bref])
				
				with connection.cursor() as cursor:
					cursor.execute(query2, [nom_bref])
		except IntegrityError as err:
			return err

	def modifier_niveau(self, nom_bref, new_nom_bref='', new_nom_complet=''):
		if not any([new_nom_bref, new_nom_complet]):
			return 

		select_niveau = "SELECT * FROM niveau WHERE nom_bref = %s LIMIT 1;"
		try:
			niveau = Niveau.objects.raw(select_niveau, [nom_bref])[0]
		except IndexError:
			return IndexError(f"Niveau with nom_bref {nom_bref} not found")

		query = "UPDATE niveau SET nom_bref = %s, nom_complet = %s WHERE nom_bref = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(
					query, 
					[new_nom_bref or niveau.nom_bref, new_nom_complet or niveau.nom_complet, nom_bref]
				)
		except IntegrityError as err:
			return err
'''

