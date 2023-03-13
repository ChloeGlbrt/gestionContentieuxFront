import { Affaire } from "./affaire";

export class Document {

    idDocument! : number;
    dateCreation! : Date;
    nom! : string;
    description! : string;
    
    affaireFK!:Affaire;
}
