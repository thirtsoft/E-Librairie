import { Client } from './client';

export class CommandeClient {
  id: number;
  numCommande: string;
  totalCommande: number;
  status: string;
  dateCommande: Date;

  client: Client;

  public constructor() {
    this.client = new Client();
  }

}
