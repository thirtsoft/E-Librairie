import { Article } from "./article";
import { Devis } from "./devis";

export class LigneDevis {
  id: number;
  numero: number;
  ItemName: string;
  quantite: number;
  qteStock: number;
  prix: number;
  prixDevis: number;
  total: number;

  devis: Devis;

  produit: Article;
}
