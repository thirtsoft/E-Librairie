import { Appro } from './appro';
import { Article } from './article';

export class LigneAppro {
  OrderItemId: number;
  numero: string;
  OrderId: number;
  ItemId: number;
  ItemName: string;
  quantite: number;
  prix: number;
  total: number;

  approvisionnement: Appro;

  produit: Article;

  public constructor() {
    this.approvisionnement = new Appro();
    this.produit  = new Article();
  }

}

