import { Appro } from './appro';
import { Produit } from './produit';

export class LigneAppro {
  id: number;
  numero: number;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  qteStock: number;
  prix: number;
  prixAppro: number;
  total: number;

  approvisionnement: Appro;

  produit: Produit;

}

