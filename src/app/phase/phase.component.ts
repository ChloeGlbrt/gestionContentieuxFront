import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { AppService } from '../app.service';
import { Phase } from '../models/phase';
import { PhaseService } from '../services/phase.service';

@Component({
  selector: 'app-phase',
  templateUrl: './phase.component.html',
  styleUrls: ['./phase.component.css']
})
export class PhaseComponent implements OnInit {

  phases!: any[];
  phase: Phase = new Phase();

  constructor(private phaseService: PhaseService, private router: Router, private appService: AppService) { }

  ngOnInit(): void {
    this.findAllPhase();
  }

  findAllPhase() {
    this.phaseService.findAll().subscribe(data => { this.phases = data });
  }
  savePhase() {
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



