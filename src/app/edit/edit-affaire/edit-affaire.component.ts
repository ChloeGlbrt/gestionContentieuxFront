import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Affaire } from '../../models/affaire';
import { AffaireService } from '../../services/affaire.service';

@Component({
  selector: 'app-edit-affaire',
  templateUrl: './edit-affaire.component.html',
  styleUrls: ['./edit-affaire.component.css']
})
export class EditAffaireComponent implements OnInit {

  affaire: Affaire = new Affaire();
  editForm!: FormGroup;

  constructor(private affaireService:AffaireService, private router:Router, private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    let currentAffaire = localStorage.getItem("editAffaireId");
    if(!currentAffaire) {
      alert("Invalid Action");
      this.router.navigate(["/affaires"])
      return;
    }
    this.editForm = this.formBuilder.group({
      idAffaire: [],
      reference: ['', Validators.required],
      titre: ['', Validators.required],
      description: ['', Validators.required],
      statut : ['', Validators.required],
    })
    this.affaireService.findOne(+currentAffaire).subscribe(data => {
      this.editForm.setValue(data);
    });
  }

  updateAffaire(){
    var affaireJson = JSON.stringify(this.editForm.value);
    this.affaireService.update(affaireJson).subscribe(() => {
      this.router.navigate(['/affaires'])
    });
  }

}
