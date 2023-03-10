import { Affaire } from "./affaire";
import { Phase } from "./phase";
import { Tribunal } from "./tribunal";
import { Utilisateur } from "./utilisateur";

export class Tache {

    idTache!: number;
    dateCreation!: Date;
    titre!: string;
    description!: string;
    statutAudience!: boolean;
    utilisateur!: Utilisateur;
    affaires!: Affaire[];
    tribunals!: Tribunal[];
    phases!: Phase[];


}
