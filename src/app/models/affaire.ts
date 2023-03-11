import { Document } from "./document";
import { Tache } from "./tache";

export class Affaire {


    idAffaire!: number;
    reference!: string;
    titre!: string;
    description!: string;
    dateAffaire!: Date;
    statut!: boolean;

    documents!: Document[];
    taches!: Tache;


}
