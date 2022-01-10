import { Client } from './client';
export class Contrat {
  id: number;
  reference: string;
  nature: string;
  montantContrat: number;
  description: string;
  dateDebutContrat: Date;
  dateFinContrat: Date;
  fileContrat: string;

  client: Client;


}
