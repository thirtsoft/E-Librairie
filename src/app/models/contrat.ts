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

  /*
  public constructor() {
    this.id = this.id;
    this.reference = this.reference;
    this.nature = this.nature;
    this.montantContrat = this.montantContrat;
    this.description = this.description;
    this.fileContrat = this.fileContrat;
    this.dateDebutContrat = this.dateDebutContrat;
    this.dateFinContrat = this.dateFinContrat;
    this.client = new Client();
  }
*/

}
