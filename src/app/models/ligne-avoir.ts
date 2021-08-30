import { Avoir } from './avoir';
import { Produit } from './produit';

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
  produit: Produit

}
