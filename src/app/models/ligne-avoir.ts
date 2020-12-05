import { Avoir } from './avoir';
import { Article } from './article';

export class LigneAvoir {
  id: number;
  numero: number;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  qteStock: number;
  prix: number;
  total: number;

  avoir: Avoir;
  produit: Article

}
