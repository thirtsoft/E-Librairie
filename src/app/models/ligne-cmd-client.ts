import { CommandeClient } from './commande-client';
import { Produit } from './produit';

export class LigneCmdClient {
  id: number;
  numero: number;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  qteStock: number;
  prix: number;
  prixCommande: number;
  total: number;

  code_article : string;

  commande: CommandeClient;

  produit: Produit;


}

export class OrderItem {
  OrderItemID: number;
  OrderID: number;
  ItemID: number;
  Quantity: number;
  ItemName:string;
  prix:number;
  Total:number;
}

