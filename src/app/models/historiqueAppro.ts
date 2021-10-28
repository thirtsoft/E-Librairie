import { Appro } from './appro';
import { Utilisateur } from './utilisateur';

export class HistoriqueAppro {
  id: number;
  status: string;
  action: string;
  createdDate: Date;

  utilisateur: Utilisateur;

  approvisionnement: Appro;


}
