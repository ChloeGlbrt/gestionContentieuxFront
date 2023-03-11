import { Tache } from "./tache";

export class Phase {
    idPhase!: number;
    nom!: string;
    dateDebut!: Date;
    dateFin!: Date;
    tacheFK! : Tache[];
}
