import { Role } from "./role";

export class Utilisateur {

    idUtilisateur!: number;
    nomUtilisateur!: string;
    prenomUtilisateur!: string;
    email!: string;
    username!: string;
    password!: string;
    roles!: Role[];
}
