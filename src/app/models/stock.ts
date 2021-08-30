import { Produit } from './produit';

export class Stock {
  id: number;
	quantite: number;
  dateMiseAJour: Date;

  produit: Produit;

  public constructor() {
    this.produit = new Produit();
  }

}
