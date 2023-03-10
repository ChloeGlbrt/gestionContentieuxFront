import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Tache } from '../../models/tache';
import { TacheService } from '../../services/tache.service';

@Component({
  selector: 'app-edit-tache',
  templateUrl: './edit-tache.component.html',
  styleUrls: ['./edit-tache.component.css']
})
export class EditTacheComponent implements OnInit {

  tache: Tache = new Tache();
  phases!: any[];
  tribunalFK!: any[];
  affaireFK!: any[];
  editForm!: FormGroup;

  constructor(private routeur: Router, private tacheService: TacheService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    let currentTache = localStorage.getItem("editTacheId");
    if (!currentTache) {
      alert("Invalid Action");
      this.routeur.navigate(["/tache"])
      return;
    }
    this.editForm = this.formBuilder.group({
      idTache: [],
      nom: ['', Validators.required],
      //dateCreation: ['', Validators.required],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      statutAudience: ['', Validators.required],
      //utilisateur: ['', Validators.required],
      affaireFK: ['', Validators.required],
      tribunalFK: ['', Validators.required],
      phases: ['', Validators.required],

    })
    this.tacheService.findOne(+currentTache).subscribe(data => { this.editForm.setValue(data); });
  }

  updateTache() {
    var tacheJson = JSON.stringify(this.editForm.value);
    this.tacheService.update(tacheJson).subscribe(() => { this.routeur.navigate(['/tache']) });
  }
}
