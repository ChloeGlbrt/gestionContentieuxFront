import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { AppService } from '../app.service';
import { Tache } from '../models/tache';
import { AffaireService } from '../services/affaire.service';
import { PhaseService } from '../services/phase.service';
import { TacheService } from '../services/tache.service';
import { TribunalService } from '../services/tribunal.service';
import {Affaire} from '../models/affaire';
import { Tribunal } from '../models/tribunal';
import { Phase } from '../models/phase';

@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {

  taches!: any[];
  phases!: any[];
  tribunalFK!: any[];
  affaireFK!: any[];

  //===Save avec clés étrangères==//
  tache: Tache = new Tache();
  affaire : Affaire = new Affaire();
  tribunal : Tribunal = new Tribunal();
  phase : Phase =new Phase();

  constructor(private tacheService: TacheService, private router: Router, private phaseService: PhaseService, private affaireService: AffaireService, private tribunalService: TribunalService, private appService: AppService) { }

  ngOnInit(): void {
    this.findAllTache();
    this.findAllPhase();
    this.findAllAffaire();
    this.findAllTribunal();
  }

  findAllTache() {
    this.tacheService.findAll().subscribe(data => { this.taches = data });
  }
  /*
  saveTache() {
    // if (!this.tache.titre || !this.tache.description || !this.tache.affaireFK || !this.tache.tribunalFK || !this.tache.phases) {
    //  alert("Missing information");
    //   return;
    // }
    this.tache.dateCreation = new Date(); // ajout de la date actuelle
    //this.tache.affaireFK = this.affaireFK;
    this.tacheService.save(this.tache).subscribe(
      () => {
        this.findAllTache();
        this.tache = new Tache();
        alert("Task added successfully")
      }
    )
  }
  */


 saveTache(){
  this.affaire.taches = this.tache;
  this.tribunal.taches = this.tache;
  this.tacheService.save(this.tache).subscribe(()=> {this.findAllTache(); this.tache = new Tache() ;})}

  deleteTache(id: number) {
    this.tacheService.delete(id).subscribe(() => { this.findAllTache() });
  }
  editTache(tache: Tache) {
    localStorage.removeItem("editTacheId");
    localStorage.setItem("editTacheId", tache.idTache.toString());
    this.router.navigate(['/editTache', tache.idTache]);
  }

  findAllTribunal() { this.tribunalService.findAll().subscribe(data => { this.tribunalFK = data }); }
  findAllPhase() { this.phaseService.findAll().subscribe(data => { this.phases = data }); }
  findAllAffaire() { this.affaireService.findAll().subscribe(data => { this.affaireFK = data }); }

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
