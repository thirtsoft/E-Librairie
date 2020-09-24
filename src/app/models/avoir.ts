import { Fournisseur } from './fournisseur';

export class Avoir {
  id: number;
  reference: string;
  libelle: string;
  soldeAvoir: number;
  nbreJours: number;

  fournisseur: Fournisseur;

  public constructor() {
    this.fournisseur = new Fournisseur();
  }
}
