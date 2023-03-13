import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Affaire } from '../models/affaire';
import { AffaireService } from '../services/affaire.service';
import { DocumentService } from '../services/document.service';
import { TacheService } from '../services/tache.service';


@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.css']
})
export class AffaireComponent implements OnInit {

  affaire: Affaire = new Affaire();

  affaires!: any[];
  documents!: any[];
  taches!: any[];

  constructor(private documentService: DocumentService, private tacheService: TacheService, private affaireService: AffaireService, private router: Router, private appService: AppService) { }


  ngOnInit(): void {
    this.findAllAffaire();
    this.findAllDocument();
  }

  findAllAffaire() {
    this.affaireService.findAll().subscribe(data => { this.affaires = data; });
  }

  saveAffaire() {
    this.affaireService.save(this.affaire).subscribe(
      () => {
        this.findAllAffaire();
        this.affaire = new Affaire();
      }
    )
  }

  deleteAffaire(id: number) {
    this.affaireService.delete(id).subscribe(
      () => {
        this.findAllAffaire();
      }
    )
  }


  editAffaire(affaire: Affaire) {
    localStorage.removeItem("editAffaireId");
    localStorage.setItem("editAffaireId", affaire.idAffaire.toString());
    this.router.navigate(['/editAffaire', affaire.idAffaire]);
  }

  findAllDocument() {
    this.documentService.findAll().subscribe(data => { this.documents = data });
  }

  /* findAllTache(){
     this.tacheService.findAll().subscribe(data => {this.taches = data});
   }*/

  convertStatutToString(statut: number): string {
    switch (statut) {
      case 0:
        return 'A venir';
      case 1:
        return 'En cours';
      case 2:
        return 'Traité';
      case 3:
        return 'Archivé';
      default:
        return 'Inconnu';
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

