import { CommandeClient } from './commande-client';
import { Article } from './article';

export class LigneCmdClient {
  id: number;
  numero: number;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  qteStock: number;
  prix: number;
  total: number;

  code_article : string;

  commande: CommandeClient;

  produit: Article;


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

