import { Employe } from './employe';

export class Versement {
  id: number;
  numVersement: string;
  numeroRecu: string;
  montantVersement: number;
  dateVersement: Date;
  motif: string;
  fileVersement: string;

  employe: Employe;

}
