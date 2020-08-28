import { Categorie } from './categorie';
import { Scategorie } from './scategorie';

export class Article {
  id: number;
  reference: string;
  designation: string;
  prixAchat: number;
  prixVente: number;
  tva: number;
  qtestock: number;
  stockInitial: number;
  promo: boolean;
  photo: string;
  add_date: Date;

  categorie: Categorie;

  scategorie: Scategorie;

  public constructor() {
    this.categorie = new Categorie();
    this.scategorie = new Scategorie();
  }



}
