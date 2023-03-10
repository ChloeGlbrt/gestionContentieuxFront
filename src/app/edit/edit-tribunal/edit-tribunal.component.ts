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
   }
   /*MAJ des données*/
   updateTribunal(){
    var tribunalJson = JSON.stringify(this.editForm.value);
    this.tribunalService.update(tribunalJson).subscribe(() => {this.router.navigate(['/tribunaux'])});
   }

}
