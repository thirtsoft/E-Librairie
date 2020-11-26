import { Vente } from './vente';
import { Article } from './article';

export class LigneVente {
  id: number;
  numero: number;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  qteStock: number;
  prixVente: number;
  total: number;

  vente: Vente;

  produit: Article;

}
