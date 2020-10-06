import { Fournisseur } from './fournisseur';

export class Appro {
    id: number;
    code: string;
    totalAppro: number;
    status: string;
    observation: string;
    DeletedOrderItemIDs: string;

    dateAppro: Date;

    fournisseur: Fournisseur;

    public constructor() {
        this.fournisseur = new Fournisseur();
    }
}
