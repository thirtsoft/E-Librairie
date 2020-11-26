import { LigneVente } from './ligne-vente';

export class Vente {
  id: number;
  numeroVente: number;
  total: number;
  totalVente: number;
  status: string;
  dateVente: Date;
  DeletedOrderItemIDs: string;

  ligneVentes :Array<LigneVente>=[];

}
