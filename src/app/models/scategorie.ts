import { Categorie } from './categorie';

export class Scategorie {
  id: number;
  code: string;
  libelle: string;

  categorie: Categorie;

  public constructor() {
    this.categorie = new Categorie();
  }

}
