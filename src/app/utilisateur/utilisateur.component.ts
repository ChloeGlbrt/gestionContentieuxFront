import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Utilisateur } from '../models/utilisateur';
import { RoleService } from '../services/role.service';
import { UtilisateurService } from '../services/utilisateur.service';
import * as $ from "jquery";
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent {

  // Déclaration d'un tableau d'utilisateur
  // any : n'importe quel type de données
  // ! ==> le tableau n'est pas initialisé
  users!: any[];
  roles!: any[];
  nomUtilisateur!: string;
  nomRecherche: any;
  utilisateur: Utilisateur = new Utilisateur();


  // DI  : par constructeur
  constructor(private utilisateurService: UtilisateurService, private roleService: RoleService, private router: Router, private appService: AppService) {

  }

  ngOnInit(): void {
    this.findAllUtilisateurs();
    this.findAllRole();
    this.nomUtilisateur = '';
    this.rechercher();

    $(document).ready(function () {
      $("#rechercheavancee").hide();
      $("#boutonrecherche").click(function () {
        $("#rechercheavancee").toggle(1500);
      });
    });
  }

  onSubmit() {
    this.rechercher();
  }

  rechercher() {
    if (this.nomUtilisateur == '') {
      this.utilisateurService.rechercher(this.nomUtilisateur).subscribe(
        data => { this.nomRecherche = data; });
    } else {
      this.utilisateurService.findAll().subscribe(data => {
        this.nomRecherche = data.filter(utilisateur => utilisateur.nomUtilisateur == this.nomUtilisateur);
      });
    }
  }

  findAllUtilisateurs() {
    // Utilisation de l'expression lambde dans le subscribe
    // data => {this.users = data}
    this.utilisateurService.findAll().subscribe(data => { this.users = data; });
  }

  findAllRole() {
    this.roleService.findAll().subscribe(data => { this.roles = data; });
  }

  saveUtilisateur() {
    this.utilisateurService.save(this.utilisateur).subscribe(
      () => {
        this.rechercher();
        // this.findAllUtilisateurs(); // MAJ de la liste des utilisateurs
        this.utilisateur = new Utilisateur(); // Vider le formulaire pour avoir une nouvelle ligne
      }
    )
  }
  deleteUtilisateur(id: number) {
    this.utilisateurService.delete(id).subscribe(
      () => {
        this.rechercher();
        // this.findAllUtilisateurs();
      }
    )
  }
  editUtilisateur(utilisateur: Utilisateur) {
    // localStorage : créer un attribut (name="editUserId") dans le navigateur et lui affecter une valeur (ediUserId= idUtilisateur)
    // étape 1 : MAJ du composant
    localStorage.removeItem("editUtilisateurId");
    // étape 2 : Sélectionner une ligne
    localStorage.setItem("editUtilisateurId", utilisateur.idUtilisateur.toString());
    this.router.navigate(['/editUtilisateur', utilisateur.idUtilisateur]);

  }

  updateStatus(utilisateur: any) {
    utilisateur.enabled = !utilisateur.enabled;
    var userJson = JSON.stringify(utilisateur);
    this.utilisateurService.update(userJson).subscribe(
      () => {
        this.findAllUtilisateurs();
      }
    )
  }

  convertStatutToString(enabled: boolean): string {
    switch (enabled) {
      case false:
        return 'Désactivé';
      case true:
        return 'Activé';
      default:
        return 'Inconnue';
    }
  }

  authenticated() {
    return this.appService.authenticated;
  }
  // Gestion des profils :
  authorities() {
    if (this.appService.isAdmin) {
      return false;
    } else {
      return true;
    }
  }
  authorities2() {
    if (this.appService.isAvocat == true) {
      return false;
    } else {
      return true;
    }
  }
  authorities3() {
    if (this.appService.isResponsable == true) {
      return false;
    } else {
      return true;
    }
  }
  authorities4() {
    if (this.appService.isNothing == true) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.appService.logout();
  }
}
