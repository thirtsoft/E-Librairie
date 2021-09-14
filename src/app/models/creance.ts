import { Utilisateur } from './utilisateur';
import { Client } from './client';
import { LigneCreance } from './ligne-creance';
export class Creance {
  id: number;
  reference: number;
  total: number;
  libelle: string;
  codeCreance: string;
  soldeCreance: number;
  avanceCreance: number;
  nbreJours: number;
	totalCreance: number;
  status: string;
  dateCreance: Date;

  client: Client;

  lcreances :Array<LigneCreance>=[];

  utilisateur: Utilisateur;

}
