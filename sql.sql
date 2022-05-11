-- 
-- Create database
--
CREATE DATABASE emploi_univ_bd CHARACTER SET utf8;


--
-- Create model Enseignant
--
CREATE TABLE `enseignant` (`matricule` varchar(15) NOT NULL PRIMARY KEY, `nom` varchar(50) NOT NULL, `prenom` varchar(50) NOT NULL);
--
-- Create model Filiere
--
CREATE TABLE `filiere` (`nom` varchar(20) NOT NULL PRIMARY KEY);
--
-- Create model Groupe
--
CREATE TABLE `groupe` (`nom` varchar(20) NOT NULL PRIMARY KEY);
--
-- Create model Niveau
--
CREATE TABLE `niveau` (`nom_bref` varchar(10) NOT NULL PRIMARY KEY, `nom_complet` varchar(20) NOT NULL UNIQUE);
--
-- Create model Salle
--
CREATE TABLE `salle` (`nom` varchar(10) NOT NULL PRIMARY KEY, `capacite` smallint UNSIGNED NOT NULL CHECK (`capacite` >= 0));
--
-- Create model Specialite
--
CREATE TABLE `specialite` (`nom` varchar(20) NOT NULL PRIMARY KEY, `effectif` smallint UNSIGNED NOT NULL CHECK (`effectif` >= 0));
--
-- Create model UE
--
CREATE TABLE `ue` (`code` varchar(10) NOT NULL PRIMARY KEY, `intitule` varchar(50) NOT NULL);
--
-- Create model Cours
--
CREATE TABLE `cours` (`code_ue` varchar(10) NOT NULL PRIMARY KEY, `jour` varchar(3) NOT NULL, `heure_debut` time(6) NOT NULL, `heure_fin` time(6) NOT NULL, `td` bool NOT NULL);
--
-- Create model RegroupementUE
--
CREATE TABLE `regroupement_ue` (`id_regroupement` bigint AUTO_INCREMENT NOT NULL PRIMARY KEY, `nom_filiere` varchar(20) NOT NULL, `nom_groupe` varchar(20) NULL, `nom_niveau` varchar(10) NOT NULL, `nom_specialite` varchar(20) NOT NULL, `code_ue` varchar(10) NOT NULL);
--
-- Create constraint unique_ue_grp_fil_niv_spec on model regroupementue
--
ALTER TABLE `regroupement_ue` ADD CONSTRAINT `unique_ue_grp_fil_niv_spec` UNIQUE (`code_ue`, `nom_groupe`, `nom_filiere`, `nom_niveau`, `nom_specialite`);
--
-- Add field enseignant to cours
--
ALTER TABLE `cours` ADD COLUMN `matricule_enseignant` varchar(15) NOT NULL , ADD CONSTRAINT `cours_matricule_enseignant_a1e15eb7_fk_enseignant_matricule` FOREIGN KEY (`matricule_enseignant`) REFERENCES `enseignant`(`matricule`);
--
-- Add field salle to cours
--
ALTER TABLE `cours` ADD COLUMN `nom_salle` varchar(10) NOT NULL , ADD CONSTRAINT `cours_nom_salle_64ca790b_fk_salle_nom` FOREIGN KEY (`nom_salle`) REFERENCES `salle`(`nom`);
ALTER TABLE `cours` ADD CONSTRAINT `cours_code_ue_4eab98b4_fk_ue_code` FOREIGN KEY (`code_ue`) REFERENCES `ue` (`code`);
ALTER TABLE `regroupement_ue` ADD CONSTRAINT `regroupement_ue_nom_filiere_37ad6178_fk_filiere_nom` FOREIGN KEY (`nom_filiere`) REFERENCES `filiere` (`nom`);
ALTER TABLE `regroupement_ue` ADD CONSTRAINT `regroupement_ue_nom_groupe_858b3c38_fk_groupe_nom` FOREIGN KEY (`nom_groupe`) REFERENCES `groupe` (`nom`);
ALTER TABLE `regroupement_ue` ADD CONSTRAINT `regroupement_ue_nom_niveau_68e563eb_fk_niveau_nom_bref` FOREIGN KEY (`nom_niveau`) REFERENCES `niveau` (`nom_bref`);
ALTER TABLE `regroupement_ue` ADD CONSTRAINT `regroupement_ue_nom_specialite_05c46171_fk_specialite_nom` FOREIGN KEY (`nom_specialite`) REFERENCES `specialite` (`nom`);
ALTER TABLE `regroupement_ue` ADD CONSTRAINT `regroupement_ue_code_ue_d28157f7_fk_ue_code` FOREIGN KEY (`code_ue`) REFERENCES `ue` (`code`);