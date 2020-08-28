import { Employe } from './employe';

export class Versement {
  id: number;
  numVersement: string;
  nature: string;
  montantVersement: number;
  dateVersement: Date;

  employe: Employe;

  public constructor() {
    this.employe = new Employe();
  }
}
