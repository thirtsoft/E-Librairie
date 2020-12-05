import { Client } from './client';
import { LigneCreance } from './ligne-creance';
export class Creance {
  id: number;
  reference: number;
  total: number;
  libelle: string;
  soldeCreance: number;
  nbreJours: number;
	totalCreance: number;
	status: string;

  client: Client;

  lcreances :Array<LigneCreance>=[];

}
