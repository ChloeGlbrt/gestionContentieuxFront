import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tribunal } from '../../models/tribunal';
import { TribunalService } from '../../services/tribunal.service';

@Component({
  selector: 'app-edit-tribunal',
  templateUrl: './edit-tribunal.component.html',
  styleUrls: ['./edit-tribunal.component.css']
})
export class EditTribunalComponent implements OnInit {

  editForm! : FormGroup;

  tribunal : Tribunal = new Tribunal();

  //===Laisser possiblité à l'utilisateur d'entrer numéro tel et fax avec ou sans tiret===//
  phoneNumberWithDashes: string;
  faxNumberWithDashes: string;

  //==Régions de France car usage Cabinets FFrance===//

  regions: string[] = [
    'Auvergne-Rhône-Alpes',
    'Bourgogne-Franche-Comté', 'Bretagne',
    'Centre-Val de Loire', 'Corse',
    'Grand Est',
    'Hauts-de-France',
    'Île-de-France',
    'Normandie', 'Nouvelle-Aquitaine',
    'Occitanie',
    'Pays de la Loire',
    'Provence-Alpes-Côte d\'Azur',
  ];

  constructor(private router:Router, private tribunalService :TribunalService, private formBuilder :FormBuilder) { }

  ngOnInit(): void {

    let currentTribunal = localStorage.getItem("editTribunalId");
    if (!currentTribunal){
      alert("Invalid Action");
      this.router.navigate(["/tribunaux"])
      return;
    }

    this.editForm = this.formBuilder.group({
      idTribunal:[],
      adresse :['', Validators.required],
      fax :['', Validators.required],
      tel :['', Validators.required],
      region:['', Validators.required]
    })
    this.tribunalService.findOne(+currentTribunal).subscribe(data => {this.editForm.setValue(data);});

    //Conversion du numéro de téléphone//
    const phoneNumberWithoutDashes = this.convertPhoneNumber(this.phoneNumberWithDashes);
    const faxNumberWithoutDashes = this.convertFaxNumber(this.faxNumberWithDashes);

  
  }
   /*MAJ des données*/
   updateTribunal() {
    const phoneNumberWithDashes = this.editForm.value.tel;
    const faxNumberWithDashes = this.editForm.value.fax;
    const phoneNumberWithoutDashes = this.convertPhoneNumber(phoneNumberWithDashes);
    const faxNumberWithoutDashes = this.convertFaxNumber(faxNumberWithDashes);
    this.editForm.value.tel = phoneNumberWithoutDashes;
    this.editForm.value.fax = faxNumberWithoutDashes;
    const tribunalJson = JSON.stringify(this.editForm.value);
    this.tribunalService.update(tribunalJson).subscribe(() => {
    this.router.navigate(['/tribunaux']);
    });
  }

  //Conversion du numéro de téléphone et fax//
   public convertPhoneNumber(phoneNumberWithDashes: string): string {
    return phoneNumberWithDashes.replace(/-/g, '');
   }

   public convertFaxNumber(faxNumberWithDashes: string): string {
    return faxNumberWithDashes.replace(/-/g, '');
   }
   
}
