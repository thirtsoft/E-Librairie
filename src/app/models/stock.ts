import { Article } from './article';

export class Stock {
  id: number;
	quantite: number;
	dateMiseAJour: Date;

	produit: Article;

  public constructor() {
    this.produit = new Article();
  }

}
