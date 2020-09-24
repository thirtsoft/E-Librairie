import { CommandeClient } from './commande-client';
import { Article } from './article';

export class LigneCmdClient {
  OrderItemId: number;
  numero: string;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  prix: number;
  total: number;

  commande: CommandeClient;

  produit: Article;

  public constructor() {
    this.commande = new CommandeClient();
    this.produit = new Article();
  }

}
