import { Utilisateur } from './utilisateur';
import { Client } from './client';
import { LigneCmdClient } from './ligne-cmd-client';

export class CommandeClient {
  id: number;
  numeroCommande: number;
  total: number;
  totalCommande: number;
  typeReglement: string;
  montantReglement: number;
  status: string;
  dateCommande: Date;


  client: Client;
  lcomms :Array<LigneCmdClient>=[];

  utilisateur: Utilisateur;

}

