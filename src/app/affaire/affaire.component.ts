import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Affaire } from '../models/affaire';
import { AffaireService } from '../services/affaire.service';
import { DocumentService } from '../services/document.service';
import { TacheService } from '../services/tache.service';
import * as $ from "jquery";
import { forkJoin, Observable } from 'rxjs';



@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.css']
})
export class AffaireComponent implements OnInit {

  affaire: Affaire = new Affaire();

  affaireRecherche: any;
  affaires!: any[];
  documents!: any[];
  taches!: any[];
  statut: string;
  idAffaire!: number;
  reference!: string;
  titre!: string;
  dateAffaire!: Date;

  documentsCount: { [reference: string]: number } = {};
  affaireCount: Affaire[] = [];

  constructor(private documentService: DocumentService, private tacheService: TacheService, private affaireService: AffaireService, private router: Router, private appService: AppService) { }


  ngOnInit(): void {
    this.findDocuments();
    this.reference = '';
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

  findAllAffaire() {
    this.affaireService.findAll().subscribe(data => { this.affaires = data; });
  }

  saveAffaire() {
    this.affaireService.save(this.affaire).subscribe(
      () => {
        this.rechercher();
        this.affaire = new Affaire();
      }
    )
  }

  deleteAffaire(id: number) {
    this.affaireService.delete(id).subscribe(
      () => {
        this.rechercher();
      }
    )
  }
  rechercher() {
    if (this.reference == '') {
      this.affaireService.rechercher(this.reference).subscribe(
        data => { this.affaireRecherche = data; });
    } else {
      this.affaireService.findAll().subscribe(data => {
        this.affaireRecherche = data.filter(affaire => affaire.reference == this.reference);
      });
    }


  }


  findDocuments() {
    this.affaireService.findAll().subscribe(affaires => {
      this.affaires = affaires;
      const requests = this.affaires.map(affaire => this.documentService.getDocumentsByReference(affaire.reference));
      forkJoin(requests).subscribe(results => {
        results.forEach((documents, index) => {
          this.documentsCount[this.affaires[index].reference] = documents.length;
        });
      });
    });
  }


  editAffaire(affaire: Affaire) {
    localStorage.removeItem("editAffaireId");
    localStorage.setItem("editAffaireId", affaire.idAffaire.toString());
    this.router.navigate(['/editAffaire', affaire.idAffaire]);
  }


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

