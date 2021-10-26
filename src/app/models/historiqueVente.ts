import { Vente } from './vente';
import { Utilisateur } from './utilisateur';

export class HistoriqueVente {
  id: number;
  status: string;
  action: string;
  createdDate: Date;

  utilisateur: Utilisateur;

  vente: Vente;



}
