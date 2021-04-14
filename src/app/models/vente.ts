import { LigneVente } from './ligne-vente';
import { Utilisateur } from './utilisateur';

export class Vente {
  id: number;
  numeroVente: number;
  total: number;
  totalVente: number;
  status: string;
  typeReglement: string;
  montantReglement: number;
  dateVente: Date;
  DeletedOrderItemIDs: string;

  ligneVentes :Array<LigneVente>=[];

  utilisateur: Utilisateur;

}
