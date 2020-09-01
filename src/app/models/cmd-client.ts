import { Client } from './client';
import { LcmdClient } from './lcmd-client';
export class CmdClient {
  id: number;
  numCommande: string;
  totalCommande: number;
  status: string;
  dateCommande: Date;

  lcomms :Array<LcmdClient> =[];

  client: Client

  public constructor() {
    this.client = new Client();
  }


}
