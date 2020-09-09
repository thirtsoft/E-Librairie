import { CommandeClient } from './commande-client';
import { Article } from './article';

export class LigneCmdClient {
  id: number;
  numero: string;
  quantite: number;
  prix: number;

  commande: CommandeClient;

  produit: Article;

  public constructor() {
    this.commande = new CommandeClient();
    this.produit = new Article();
  }
}
