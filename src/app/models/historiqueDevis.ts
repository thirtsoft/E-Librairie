import { Devis } from './devis';
import { Utilisateur } from './utilisateur';

export class HistoriqueDevis {
  id: number;
  status: string;
  action: string;
  createdDate: Date;

  utilisateur: Utilisateur;

  devis: Devis;



}
