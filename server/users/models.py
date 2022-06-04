from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ObjectDoesNotExist
from django.db import connection, transaction
from django.db.utils import IntegrityError

from time_table.models import UE, Cours, Enseignant, Filiere, Salle, Specialite, Groupe


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
			
					# We verify just the second query coz it's directly related to the filiere table
					if cursor.rowcount == 0:
						raise Filiere.DoesNotExist(f"Filiere '{nom}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err

	def renommer_filiere(self, nom, new_nom):
		if nom == new_nom:
			return 

		query = "UPDATE filiere SET nom = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom, nom])

				if cursor.rowcount == 0:
					raise Filiere.DoesNotExist(f"Filiere '{nom}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err


class SpecialiteOps:
	def ajouter_multiple_specialites(self, nom_filiere, specialites):
		"""`specialites` is an array with `nom`, bool `master` and bool `licence`."""

		query1_start = "INSERT INTO specialite (nom) VALUES "
		query2_start = "INSERT INTO regroupement (nom_filiere, nom_specialite, nom_niveau) VALUES "
		query1_next, query2_next = "(%s, %s), ", "(%s, %s, %s), "
		query1, query2 = query1_start, query2_start
		params1, params2 = [], []

		for special in specialites:
			nom_special = special['nom']
			query1 += query1_next
			params1.extend([nom_special])

			if special.get('master'):
				query2 += query2_next
				params2.extend([nom_filiere, nom_special, 'M1'])

			if special.get('licence'):
				query2 += query2_next
				params2.extend([nom_filiere, nom_special, 'L3'])

		# Remove last ', ' from query strings (last two characters of `query2_next`)
		query1 = query1[:-2]
		query2 = query2[:-2]

		try:
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, params1)

				with connection.cursor() as cursor:
					cursor.execute(query2, params2)
		except IntegrityError as err:
			return err

	def supprimer_specialite(self, nom, licence: bool, master: bool):
		if not licence and not master:
			return

		try:
			if licence and master:
				query1 = "DELETE FROM specialite WHERE nom = %s;"
				with connection.cursor() as cursor:
					cursor.execute(query1, [nom])

					if cursor.rowcount == 0:
						raise Specialite.DoesNotExist(f"Specialite '{nom}' not found")
						
				return

			query1 = "DELETE FROM regroupement WHERE nom_specialite = %s AND nom_niveau = %s;"
			
			## If only licence was passed, delete specialite from regroupement table 
			# where niveau is licence.
			# if licence:
			# 	niv = 'L3'
			# elif master: 
			# 	niv = 'M1'
			niv = 'L3' if licence else 'M1'
				
			with connection.cursor() as cursor:
				cursor.execute(query1, [nom, niv])

				if cursor.rowcount == 0:
					raise Specialite.DoesNotExist(f"Specialite '{nom}' for niveau {niv} not found")

			# Now check if the specialite is still in the regroupement table. If it's no longer
			# present, delete it from the specialite table.
			query2 = "SELECT COUNT(*) FROM regroupement WHERE nom_specialite = %s;"
			with connection.cursor() as cursor:
				cursor.execute(query2, [nom])
				# Query will return tuple with one element which is the count
				res = cursor.fetchone()[0]

			if res == 0:
				query3 = "DELETE FROM specialite WHERE nom = %s;"
				with connection.cursor() as cursor:
					cursor.execute(query3, [nom])
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err

	def renommer_specialite(self, nom, new_nom):
		if nom == new_nom:
			return

		query = "UPDATE specialite SET nom = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom, nom])
				
				if cursor.rowcount == 0:
					raise Specialite.DoesNotExist(f"Specialite '{nom}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err


class GroupeOps:
	def ajouter_multiple_groupes(self, nom_filiere, nom_niveau, nom_groupes, nom_specialite=None):
		query1_start = "INSERT INTO groupe (nom) VALUES "
		query2_start = """
			INSERT INTO regroupement (nom_groupe, nom_filiere, nom_specialite, nom_niveau) VALUES 
		"""
		query1_next, query2_next = "(%s), ", "(%s, %s, %s, %s), "
		query1, query2 = query1_start, query2_start
		params1, params2 = [], []

		for nom in nom_groupes:
			

			nom_special = special['nom']
			query1 += query1_next
			params1.extend([nom_special])

			if special.get('master'):
				query2 += query2_next
				params2.extend([nom_filiere, nom_special, 'M1'])

			if special.get('licence'):
				query2 += query2_next
				params2.extend([nom_filiere, nom_special, 'L3'])

		# Remove last ', ' from query strings (last two characters of `query2_next`)
		query1 = query1[:-2]
		query2 = query2[:-2]

		try:
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, params1)

				with connection.cursor() as cursor:
					cursor.execute(query2, params2)
		except IntegrityError as err:
			return err


	def ajouter_groupe(self, nom, code_ue, nom_filiere, nom_niveau, nom_specialite=None):
		query1 = "INSERT INTO groupe (nom) VALUES (%s);"
		query2 = """
			INSERT INTO regroupement (code_ue, nom_filiere, nom_niveau, nom_groupe, nom_specialite)
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

	def supprimer_groupe(self, nom, nom_filiere, nom_niveau, nom_specialite=None):
		try:
			query1 = """
				DELETE FROM regroupement WHERE nom_filiere = %s AND nom_niveau = %s 
				AND nom_specialite = %s AND nom_groupe = %s;
			"""
				
			with connection.cursor() as cursor:
				cursor.execute(query1, [nom_filiere, nom_niveau, nom_specialite, nom])

				if cursor.rowcount == 0:
					raise Groupe.DoesNotExist(
						f"Groupe {nom} for niveau {nom_niveau}, filiere {nom_filiere}, \
						specialite {nom_specialite} not found"
					)

			# Now check if the groupe is still in the regroupement table. If it's no longer
			# present, delete it from the groupe table.
			query2 = "SELECT COUNT(*) FROM regroupement WHERE nom_groupe = %s;"
			with connection.cursor() as cursor:
				cursor.execute(query2, [nom])
				# Query will return tuple with one element which is the count
				res = cursor.fetchone()[0]

			if res == 0:
				query3 = "DELETE FROM groupe WHERE nom = %s;"
				with connection.cursor() as cursor:
					cursor.execute(query3, [nom])
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err

	def renommer_groupe(self, nom, new_nom, nom_niveau, nom_filiere, nom_specialite=None):
		if nom == new_nom:
			return

		query1 = """
			UPDATE regroupement SET nom = %s WHERE nom_niveau = %s AND 
			nom_filiere = %s AND nom_specialite = %s AND nom_groupe = %s;
		"""

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query1, [nom, nom_niveau, nom_filiere, nom_specialite])

				if cursor.rowcount == 0:
					raise Groupe.DoesNotExist(
						f"Groupe {nom} for niveau {nom_niveau}, filiere {nom_filiere}, \
						specialite {nom_specialite} not found"
					)
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err

		# Now insert the new groupe in the groupe table. If it already exists, 
		# do nothing
		query2 = "INSERT INTO groupe (nom) VALUES (%s);"
		try:
			with connection.cursor() as cursor:
				cursor.execute(query2, [new_nom])
		except IntegrityError:
			pass			


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
					
					if cursor.rowcount == 0:
						raise Salle.DoesNotExist(f"Salle '{nom}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err

	def modifier_salle(self, nom, new_nom='', new_capacite=0):
		if not any([new_nom, new_capacite]):
			return

		select_salle = "SELECT * FROM salle WHERE nom = %s LIMIT 1;"
		try:
			salle = Salle.objects.raw(select_salle, [nom])[0]
		except IndexError:
			return IndexError(f"Salle '{nom}' not found")

		query = "UPDATE salle SET nom = %s, capacite = %s WHERE nom = %s;"

		try: 
			with connection.cursor() as cursor:
				cursor.execute(query, [new_nom or salle.nom, new_capacite or salle.capacite, nom])
				
				if cursor.rowcount == 0:
					raise Salle.DoesNotExist(f"Salle '{nom}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
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
					
					if cursor.rowcount == 0:
						raise Enseignant.DoesNotExist(f"Enseignant '{matricule}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
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

				if cursor.rowcount == 0:
					raise Enseignant.DoesNotExist(f"Enseignant '{matricule}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err


class UEOps:
	def ajouter_ue(self, code, intitule, nom_filiere, nom_niveau, nom_specialite=None):
		query1 = "INSERT INTO ue (code, intitule) VALUES (%s, %s);"
		query2 = """
			INSERT INTO regroupement (code_ue, nom_filiere, nom_niveau, nom_specialite) 
			VALUES (%s, %s, %s, %s);
		"""
		
		try:
			with transaction.atomic():
				with connection.cursor() as cursor:
					cursor.execute(query1, [code, intitule])

				with connection.cursor() as cursor:
					cursor.execute(query2, [code, nom_filiere, nom_niveau, nom_specialite])
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

					if cursor.rowcount == 0:
						raise UE.DoesNotExist(f"UE '{code}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
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
				if cursor.rowcount == 0:
					raise UE.DoesNotExist(f"UE '{code}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
			return err


class CoursOps:
	def ajouter_cours(
		self, code_ue, nom_salle, jour, 
		heure_debut, heure_fin, is_td=None
	):
		# Recall that when UE is added, a Cours is created containing only the
		# code_ue and matricule_ens. 

		# query = "INSERT INTO cours (code_ue, matricule_ens) VALUES (%s, %s);"
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

					if cursor.rowcount == 0:
						raise Cours.DoesNotExist(f"Cours '{code_ue}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
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
				if cursor.rowcount == 0:
					raise Cours.DoesNotExist(f"Cours '{code_ue}' not found")
		except (IntegrityError, ObjectDoesNotExist) as err:
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
			return IndexError(f"Niveau_bref {nom_bref} not found")

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


# def ajouter_specialite(self, nom, nom_niveau, nom_filiere, effectif):
# 	query1 = "INSERT INTO specialite (nom, effectif) VALUES (%s, %s);"
# 	query2 = """
# 		INSERT INTO regroupement (nom_filiere, nom_niveau, nom_specialite) 
# 		VALUES (%s, %s, %s);
# 	"""
	
# 	try:
# 		with transaction.atomic():
# 			with connection.cursor() as cursor:
# 				cursor.execute(query1, [nom, effectif])

# 			with connection.cursor() as cursor:
# 				cursor.execute(query2, [nom_filiere, nom_niveau, nom])
# 	except IntegrityError as err:
# 		return err


