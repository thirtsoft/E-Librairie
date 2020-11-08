import { Client } from './client';
import { LigneCmdClient } from './ligne-cmd-client';

export class CommandeClient {
  id: number;
  numeroCommande: number;
  total: number;
  //libArticle: string;
  totalCommande: number;
  status: string;
  dateCommande: Date;
  DeletedOrderItemIDs: string;

 // refClient : number;
  lib_client : String;

  client: Client;
  lcomms :Array<LigneCmdClient>=[];


}

export class Order {
  OrderID: number;
  OrderNo: string;
  CustomerID: number;
  numeroCommande: number;
  total: number;
  DeletedOrderItemIDs: string;
}

