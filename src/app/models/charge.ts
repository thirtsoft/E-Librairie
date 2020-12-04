import { CategorieCharge } from './categorieCharge';

export class Charge {
  id: number;
  codeCharge: string;
  nature: string;
  montantCharge: number;
  date: Date;

  categorieCharge: CategorieCharge;

}
