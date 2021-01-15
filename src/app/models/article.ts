import { Categorie } from './categorie';
import { Scategorie } from './scategorie';

export class Article {
  id: number;
  reference: string;
  designation: string;
  prixAchat: number;
  prixVente: number;
  prixDetail: number;
  tva: number;
  qtestock: number;
  stockInitial: number;
  promo: boolean;
  photo: string;
  add_date: Date;

  scategorie = new Scategorie();



}

export class Item {
  ItemID: number;
  designation: string;
  prixVente: number;
}
