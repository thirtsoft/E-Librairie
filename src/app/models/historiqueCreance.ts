import { Creance } from './creance';
import { Utilisateur } from './utilisateur';

export class HistoriqueCreance {
  id: number;
  status: string;
  action: string;
  createdDate: Date;

  utilisateur: Utilisateur;

  creance: Creance;



}
