import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { AppService } from '../../app.service';
import { Affaire } from '../../models/affaire';
import { Phase } from '../../models/phase';
import { Tribunal } from '../../models/tribunal';
import { Utilisateur } from '../../models/utilisateur';
import { AffaireService } from '../../services/affaire.service';
import { PhaseService } from '../../services/phase.service';
import { TribunalService } from '../../services/tribunal.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Tache } from '../../models/tache';
import { TacheService } from '../../services/tache.service';

@Component({
  selector: 'app-edit-tache',
  templateUrl: './edit-tache.component.html',
  styleUrls: ['./edit-tache.component.css']
})
export class EditTacheComponent implements OnInit {

  tache: Tache = new Tache();
  editForm!: FormGroup;
  taches!: any[];
  phases!: any[];
  tribunalFK!: any[];
  affaireFK!: any[];
  currentDate!: string;

  //===Liaison tache avec utilisateur connecté===//
  seletedUser!: any;
  user: Utilisateur = new Utilisateur();
  idUser: any;

  //===Save avec clés étrangères==//
  affaire: Affaire = new Affaire();
  tribunal: Tribunal = new Tribunal();
  phase: Phase = new Phase();

  constructor(
    private tacheService: TacheService,
    private routeur: Router,
    private phaseService: PhaseService,
    private affaireService: AffaireService,
    private tribunalService: TribunalService,
    private appService: AppService,
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService) { }

  ngOnInit(): void {
    this.findAllPhase();
    this.findAllAffaire();
    this.findAllTribunal();



    let currentTache = localStorage.getItem("editTacheId");
    if (!currentTache) {
      alert("Invalid Action");
      this.routeur.navigate(["/tache"])
      return;
    }
    this.editForm = this.formBuilder.group({
      idTache: [],
      dateCreation: ['', Validators.required],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      statutAudience: ['', Validators.required],
      utilisateurFK: ['', Validators.required],
      affaireFK: ['', Validators.required],
      tribunalFK: ['', Validators.required],
      phases: ['', Validators.required],

    })
    this.tacheService.findOne(+currentTache).subscribe(data => { this.editForm.setValue(data); });
  }

  findAllTribunal() { this.tribunalService.findAll().subscribe(data => { this.tribunalFK = data }); }
  findAllPhase() { this.phaseService.findAll().subscribe(data => { this.phases = data }); }
  findAllAffaire() { this.affaireService.findAll().subscribe(data => { this.affaireFK = data }); }


  updateTache() {
    // Récupère les objets affaire et tribunal correspondant aux id stockés dans les propriétés de la tâche
    this.affaireService.findOne(this.tache.affaireFK.idAffaire).subscribe((affaire) => {
      this.tache.affaireFK = affaire;

      this.tribunalService.findOne(this.tache.tribunalFK.idTribunal).subscribe((tribunal) => {
        this.tache.tribunalFK = tribunal;

        var tacheJson = JSON.stringify(this.editForm.value);
        console.log("Tache avant mise à jour: ", this.tache);

        this.tacheService.update(tacheJson).subscribe(() => {
          console.log("Tache après mise à jour: ", this.tache);
          this.routeur.navigate(['/tache']);
          alert("Tâche mise à jour avec succès");
        });
      });
    });
  }




  //pdateTache() {

  // console.log("Affaire: ", this.affaire);
  // console.log("Tribunal: ", this.tribunal);

  // this.tache.affaireFK = this.affaire;
  // this.tache.tribunalFK = this.tribunal;
  // var tacheJson = JSON.stringify(this.editForm.value);
  // // this.tacheService.update(tacheJson).subscribe(() => { this.routeur.navigate(['/tache']) }); alert("Task updated successfully");
  // console.log("Tache avant mise à jour: ", this.tache);
  // this.tacheService.update(tacheJson).subscribe(() => {
  //   console.log("Tache après mise à jour: ", this.tache);
  //   this.routeur.navigate(['/tache']);
  //   alert("Task updated successfully");
  // });
}



  // saveTache() {
  //   this.tache.utilisateurFK = this.user;//Lien avec utilisateur connecté
  //   let idTache = this.tache.idTache;//Lien avec utilisateur connecté
  //   this.affaire.taches = this.tache;//Lien avec affaire
  //   this.tribunal.taches = this.tache;//Lien avec tribunal
  //   this.tache.dateCreation = new Date(); // ajout de la date actuelle
  //   this.tacheService.save(this.tache).subscribe(() => { this.findAllTache(); this.tache = new Tache(); alert("Task added successfully"); })
  // }
  // compareTribunal(tr1: any, tr2: any): boolean {
  //   return tr1 && tr2 ? tr1.adresse === tr2.adresse : tr1 === tr2;
  // }






