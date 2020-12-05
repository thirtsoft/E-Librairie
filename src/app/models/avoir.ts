import { Fournisseur } from './fournisseur';
import { LigneAvoir } from './ligne-avoir';

export class Avoir {
  id: number;
  reference: string;
  libelle: string;
  total: number;
  soldeAvoir: number;
  nbreJours: number;
  totalAvoir: number;
  status: string;

  fournisseur: Fournisseur;
  lavoirs :Array<LigneAvoir>=[];

}
