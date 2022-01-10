import { Utilisateur } from './utilisateur';
import { Fournisseur } from './fournisseur';
import { LigneAppro } from './ligne-appro';

export class Appro {
  id: number;
  code: number;
  total: number;
  montantAvance: number;
  totalAppro: number;
  status: string;
  observation: string;
  DeletedOrderItemIDs: string;

  dateApprovisionnement: Date;

  fournisseur: Fournisseur;

  ligneApprovisionnements :Array<LigneAppro>=[];

}
