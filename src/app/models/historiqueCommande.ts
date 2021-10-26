import { CommandeClient } from './commande-client';
import { Utilisateur } from './utilisateur';

export class HistoriqueCommande {
  id: number;
  status: string;
  action: string;
  createdDate: Date;

  utilisateur: Utilisateur;

  commandeClient: CommandeClient;



}
