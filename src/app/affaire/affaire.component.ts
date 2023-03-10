import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Affaire } from '../models/affaire';
import { AffaireService } from '../services/affaire.service';

@Component({
  selector: 'app-affaire',
  templateUrl: './affaire.component.html',
  styleUrls: ['./affaire.component.css']
})
export class AffaireComponent implements OnInit {

  affaire: Affaire = new Affaire();
  affaires!: any[];

  constructor(private affaireService: AffaireService, private router: Router) { }

  ngOnInit(): void {
    this.findAllAffaire();
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
}
