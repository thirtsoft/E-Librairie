import { Vente } from './vente';
import { Article } from './article';

export class LigneVente {
  OrderItemId: number;
  numero: string;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  prixVente: number;
  total: number;

  vente: Vente;

  produit: Article;

  public constructor() {
    this.vente = new Vente();
    this.produit = new Article();
  }
}
