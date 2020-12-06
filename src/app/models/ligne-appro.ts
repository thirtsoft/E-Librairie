import { Appro } from './appro';
import { Article } from './article';

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

  produit: Article;

/*
  public constructor() {
    this.approvisionnement = new Appro();
    this.produit  = new Article();
  }
*/
}

