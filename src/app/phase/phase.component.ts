import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Phase } from '../models/phase';
import { Tache } from '../models/tache';
import { AffaireService } from '../services/affaire.service';
import { PhaseService } from '../services/phase.service';
import { TacheService } from '../services/tache.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {

  phases!: any[];
  tacheFK!: any[];
  phase: Phase = new Phase();
  tache:Tache =new Tache();

  constructor(private phaseService: PhaseService,private tacheService: TacheService, private affaireService : AffaireService, private router: Router) { }

  ngOnInit(): void {
    this.findAllPhase();
    this.findAllTache();
  }

  findAllPhase() {
    this.phaseService.findAll().subscribe(data => { this.phases = data });
  }

  findAllTache(){
    this.tacheService.findAll().subscribe(data =>{ this.tacheFK = data});
  }
  savePhase() {
    this.tache.phases= this.phases;
    this.phaseService.save(this.phase).subscribe(
      () => {
        this.findAllPhase();
        this.phase = new Phase();
      }
    )
  }
  deletePhase(id: number) {
    this.phaseService.delete(id).subscribe(() => { this.findAllPhase() });
  }
  editPhase(phase: Phase) {
    localStorage.removeItem("editPhaseId");
    localStorage.setItem("editPhaseId", phase.idPhase.toString());
    this.router.navigate(['/editPhase', phase.idPhase]);
  }
}
