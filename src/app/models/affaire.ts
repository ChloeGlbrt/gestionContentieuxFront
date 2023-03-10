import { Document } from "./document";
import { Tache } from "./tache";

export class Affaire {

    idAffaire! : number;
    reference! : string;
    titre! : string;
    description! : string;
    statut! : boolean;

    documents! : Document[];
    taches! : Tache[];
    dateAffaire!: Date;

}
