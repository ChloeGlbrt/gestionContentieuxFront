import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';

@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.css']
})
export class EditUtilisateurComponent implements OnInit {

  editForm!: FormGroup;
  utilisateur: Utilisateur = new Utilisateur();
  constructor(private router: Router, private utilisateurService: UtilisateurService, private formBuilder: FormBuilder) {

  }
  // Step 1 : Remplir les champs du formulaire
  // editUserId : idUtilisateur
  // nomUtilisateur, prenomUtilisateur : les champs du formulaire
  // findOne : faire une recherche des données et remplir les champs
  ngOnInit(): void {
    let currentUser = localStorage.getItem("editUtilisateurId");
    if (!currentUser) {
      alert("Invalid Action");
      this.router.navigate(["/utilisateur"]);
      return;
    }
    this.editForm = this.formBuilder.group({
      idUtilisateur: [],
      nomUtilisateur: ['', Validators.required],
      prenomUtilisateur: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      enabled: ['', Validators.required],
    })
    this.utilisateurService.findOne(+currentUser).subscribe(data => { this.editForm.setValue(data); })
  }

  // Step 2 : Mettre à jour les données
  updateUtilisateur() {
    var userJson = JSON.stringify(this.editForm.value);
    this.utilisateurService.update(userJson).subscribe(() => { this.router.navigate(['/utilisateur']) });
  }

}
