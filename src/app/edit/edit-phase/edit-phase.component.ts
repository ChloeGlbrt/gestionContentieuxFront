import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Phase } from '../../models/phase';
import { PhaseService } from '../../services/phase.service';

@Component({
  selector: 'app-edit-phase',
  templateUrl: './edit-phase.component.html',
  styleUrls: ['./edit-phase.component.css']
})
export class EditPhaseComponent implements OnInit {

  phase: Phase = new Phase();
  editForm!: FormGroup;

  constructor(private routeur: Router, private phaseService: PhaseService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    let currentPhase = localStorage.getItem("editPhaseId");
    if (!currentPhase) {
      alert("Invalid Action");
      this.routeur.navigate(["/phase"])
      return;
    }
    this.editForm = this.formBuilder.group({
      idPhase: [],
      nom: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
    })
    this.phaseService.findOne(+currentPhase).subscribe(data => { this.editForm.setValue(data); });
  }

  updatePhase() {
    var phaseJson = JSON.stringify(this.editForm.value);
    this.phaseService.update(phaseJson).subscribe(() => { this.routeur.navigate(['/phase']) });
  }
}
