import { Client } from "./client";
import { LigneDevis } from "./ligne-devis";

export class Devis {
  id: number;
  numeroDevis: number;
  total: number;
	totalDevis: number;
  String: string;
  dateDevis: Date;

  client: Client;

  ldevis :Array<LigneDevis>=[];
}
