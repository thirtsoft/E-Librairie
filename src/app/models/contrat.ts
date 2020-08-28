import { Client } from './client';

export class Contrat {
  id: number;
  reference: string;
  nature: string;
  description: string;
  dateContrat: Date;

  client: Client;

  public constructor() {
    this.reference = this.reference;
    this.nature = this.nature;
    this.description = this.description;
    this.dateContrat = this.dateContrat;
    this.client = new Client();
  }


}
