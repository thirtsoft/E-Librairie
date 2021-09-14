import { Client } from './client';
import { LigneCmdClient } from './ligne-cmd-client';

export class CommandeClient {
  id: number;
  numeroCommande: number;
  total: number;
  //libArticle: string;
  totalCommande: number;
  typeReglement: string;
  montantReglement: number;
  status: string;
  dateCommande: Date;
//  DeletedOrderItemIDs: string;

 // refClient : number;
//  lib_client : String;

  client: Client;
  lcomms :Array<LigneCmdClient>=[];

}

