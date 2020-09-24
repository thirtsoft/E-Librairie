import { Employe } from './employe';

export class Versement {
  id: number;
  numVersement: string;
  nature: string;
  numeroRecu: string;
  nomBank: string;
  montantVersement: number;
  dateVersement: Date;
  motif: string;

  employe: Employe;

  public constructor() {
    this.employe = new Employe();
  }
}
