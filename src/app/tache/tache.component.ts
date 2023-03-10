import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Tache } from '../models/tache';
import { AffaireService } from '../services/affaire.service';
import { PhaseService } from '../services/phase.service';
import { TacheService } from '../services/tache.service';
import { TribunalService } from '../services/tribunal.service';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {

  taches!: any[];
  phases!: any[];
  tribunaux!: any[];
  affaires!: any[];
  tache: Tache = new Tache();

  constructor(private tacheService: TacheService, private router: Router, private phaseService: PhaseService, private affaireService: AffaireService, private tribunalService: TribunalService) { }

  ngOnInit(): void {
    this.findAllTache();
    this.findAllPhase();
    //  this.findAllAffaire();
    this.findAllTribunal();
  }

  findAllTache() {
    this.tacheService.findAll().subscribe(data => { this.taches = data });
  }
  saveTache() {
    this.tacheService.save(this.tache).subscribe(
      () => {
        this.findAllTache();
        this.tache = new Tache();
      }
    )
  }
  deleteTache(id: number) {
    this.tacheService.delete(id).subscribe(() => { this.findAllTache() });
  }
  editTache(tache: Tache) {
    localStorage.removeItem("editTacheId");
    localStorage.setItem("editTacheId", tache.idTache.toString());
    this.router.navigate(['/editTache', tache.idTache]);
  }

  findAllTribunal() { this.tribunalService.findAll().subscribe(data => { this.tribunaux = data }); }
  findAllPhase() { this.phaseService.findAll().subscribe(data => { this.phases = data }); }
  // findAllAffaire() { this.affaireService.findAll().subscribe(data => { this.affaires = data }); }
}
