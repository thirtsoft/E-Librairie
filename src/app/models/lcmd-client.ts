import { CmdClient } from './cmd-client';
import { Article } from './article';

export class LcmdClient {
  id: number;
  numero: string;
  quantite: number;
  prix: number;

  commande: CmdClient;

  produit: Article;

  public constructor() {
    this.commande = new CmdClient();
    this.produit = new Article();
  }

}
