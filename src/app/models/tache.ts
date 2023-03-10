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
    affaire!: Affaire;
    tribunal!: Tribunal;
    phase!: Phase;


}
