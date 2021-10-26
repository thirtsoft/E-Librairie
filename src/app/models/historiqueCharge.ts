import { Charge } from './charge';
import { Utilisateur } from './utilisateur';

export class HistoriqueCharge {
  id: number;
  status: string;
  action: string;
  createdDate: Date;

  utilisateur: Utilisateur;

  charge: Charge;



}
