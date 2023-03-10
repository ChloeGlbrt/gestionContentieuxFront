import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Utilisateur } from '../models/utilisateur';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // Récupération des données de l'utilisateur connecté step 3
  idUser: any;
  user: Utilisateur = new Utilisateur();

  constructor(private utilisateurService: UtilisateurService, private appService: AppService, private router: Router) { }

  findOne(id: number) {
    this.utilisateurService.findOne(id).subscribe(data => { this.user = data; });
  }

  ngOnInit() {
    this.idUser = this.appService.idUser;
    console.log("user profile " + this.idUser);
    this.findOne(this.idUser);

  }

  editUtilisateur(utilisateur: Utilisateur) {
    // localStorage : créer un attribut (name="editUserId") dans le navigateur et lui affecter une valeur (ediUserId= idUtilisateur)
    // étape 1 : MAJ du composant
    localStorage.removeItem("editUtilisateurId");
    // étape 2 : Séleectionner une ligne
    localStorage.setItem("editUtilisateurId", utilisateur.idUtilisateur.toString());
    this.router.navigate(['/editUtilisateur', utilisateur.idUtilisateur]);

  }

  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }

  logout() {
    this.appService.logout();
  }
}
