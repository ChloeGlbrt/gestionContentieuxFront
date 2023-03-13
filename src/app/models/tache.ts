import { Affaire } from "./affaire";
import { Phase } from "./phase";
import { Tribunal } from "./tribunal";
import { Utilisateur } from "./utilisateur";

export class Tache {
    // filter(arg0: (tache: any) => boolean) {
    //     throw new Error('Method not implemented.');
    // }

    idTache!: number;
    dateCreation!: Date;
    titre!: string;
    description!: string;
    statutAudience!: boolean;

    utilisateurFK!: Utilisateur;
    affaireFK!: Affaire;
    tribunalFK!: Tribunal;
    phases!: Phase[];


}
