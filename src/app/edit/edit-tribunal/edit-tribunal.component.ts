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
  phoneNumberWithDashes: string;

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
    
   }
   /*MAJ des données*/

   updateTribunal() {
    // Récupérer la valeur du champ de téléphone
    const phoneNumberWithDashes = this.editForm.value.tel;
    const faxNumberWithDashes = this.editForm.value.fax;
    // Convertir le numéro de téléphone en format sans tirets
    const phoneNumberWithoutDashes = this.convertPhoneNumber(phoneNumberWithDashes);
    const faxNumberWithoutDashes = this.convertFaxNumber(faxNumberWithDashes);
    // Mettre à jour les données avec le numéro de téléphone sans tirets
    this.editForm.value.tel = phoneNumberWithoutDashes;
    this.editForm.value.fax = faxNumberWithoutDashes;
    const tribunalJson = JSON.stringify(this.editForm.value);
    this.tribunalService.update(tribunalJson).subscribe(() => {
      this.router.navigate(['/tribunaux']);
    });
  }

   public convertPhoneNumber(phoneNumberWithDashes: string): string {
    return phoneNumberWithDashes.replace(/-/g, '');
   }

   public convertFaxNumber(faxNumberWithDashes: string): string {
    return faxNumberWithDashes.replace(/-/g, '');
   }
   
}
