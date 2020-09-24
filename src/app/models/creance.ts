import { Client } from './client';
export class Creance {
  id: number;
  reference: string;
  libelle: string;
  soldeCreance: number;
  nbreJours: number;

  client: Client;

  public constructor() {
    this.client = new Client();
  }

}
