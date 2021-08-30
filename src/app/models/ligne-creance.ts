import { Avoir } from './avoir';
import { Produit } from './produit';
import { Creance } from './creance';

export class LigneCreance {
  id: number;
  numero: number;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  qteStock: number;
  prix: number;
  total: number;

  creance: Creance;

  produit: Produit;
}
