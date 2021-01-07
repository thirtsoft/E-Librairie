import { Fournisseur } from './fournisseur';

export class Email {
  id: number;
  recever: string;
  subject: string;
  message: string;
  toRevever: string;
  email: string;

  four: Fournisseur;

  public constructor() {
    this.id = this.id;
    this.recever = this.four.email;
    this.subject = this.subject;
    this.message = this.message;
  }

}
