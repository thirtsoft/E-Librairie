import { Utilisateur } from './utilisateur';
import { Fournisseur } from './fournisseur';
import { LigneAppro } from './ligne-appro';

export class Appro {
  id: number;
  ode: number;
  total: number;
  montantAvance: number;
  totalAppro: number;
  status: string;
  observation: string;
  DeletedOrderItemIDs: string;

  dateApprovisionnement: Date;

  fournisseur: Fournisseur;

 // utilisateur: Utilisateur;

  ligneApprovisionnements :Array<LigneAppro>=[];

}
