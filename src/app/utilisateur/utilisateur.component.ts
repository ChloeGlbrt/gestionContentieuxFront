import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Utilisateur } from '../models/utilisateur';
import { RoleService } from '../services/role.service';
import { UtilisateurService } from '../services/utilisateur.service';

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
  utilisateur: Utilisateur = new Utilisateur();


  // DI  : par constructeur
  constructor(private utilisateurService: UtilisateurService, private roleService: RoleService, private router: Router, private appService: AppService) {

  }

  ngOnInit(): void {
    this.findAllUtilisateurs();
    this.findAllRole();
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
        this.findAllUtilisateurs(); // MAJ de la liste des utilisateurs
        this.utilisateur = new Utilisateur(); // Vider le formulaire pour avoir une nouvelle ligne
      }
    )
  }
  deleteUtilisateur(id: number) {
    this.utilisateurService.delete(id).subscribe(
      () => {
        this.findAllUtilisateurs();
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

  convertStatutToString(statutCompte: boolean): string {
    switch (statutCompte) {
      case false:
        return 'Désactivé';
      case true:
        return 'Activé';
      default:
        return 'Inconnue';
    }
  }
  /*
    updateAccountStatus(data) {
      if (data.statutCompte === true) {
        this.utilisateur.statutCompte = true;
      } else {
        this.utilisateur.statutCompte = false;
      }
    }
  
    setAccountStatusTrue(data) {
      this.utilisateur.statutCompte = true;
    }
  
    setAccountStatusFalse(data) {
      this.utilisateur.statutCompte = false;
    }
    */

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
