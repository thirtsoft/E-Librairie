import { Avoir } from './avoir';
import { Utilisateur } from './utilisateur';

export class HistoriqueAvoir {
  id: number;
  status: string;
  action: string;
  createdDate: Date;

  utilisateur: Utilisateur;

  avoir: Avoir;


}
