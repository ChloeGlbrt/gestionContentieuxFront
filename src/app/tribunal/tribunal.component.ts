import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tribunal } from '../models/tribunal';
import { TacheService } from '../services/tache.service';
import { TribunalService } from '../services/tribunal.service';

@Component({
  selector: 'app-tribunal',
  templateUrl: './tribunal.component.html',
  styleUrls: ['./tribunal.component.css']
})
export class TribunalComponent implements OnInit {

  tribunaux! : any[];
  taches! : any [];

  tribunal : Tribunal = new Tribunal();

  constructor(private tribunalService : TribunalService, private tacheService : TacheService, private router:Router) { }

  ngOnInit(): void {
    this.findAll();
  }

  //===Méthodes générales===//

  findAll() { this.tribunalService.findAll().subscribe(data => {this.tribunaux = data });}
  
 // save() {this.tribunalService.save(this.tribunal).subscribe(() => {this.findAll(); this.tribunal = new Tribunal()});}

  

  delete(id :number) {this.tribunalService.delete(id).subscribe(() => {this.findAll()});}

  editTribunal (tribunal:Tribunal){
    localStorage.removeItem("editTribunalId");
    localStorage.setItem("editTribunalId", tribunal.idTribunal.toString());
    this.router.navigate(['/editTribunal',tribunal.idTribunal]);
  }

  //===Conversion numero de téléphone===//
  public convertPhoneNumber(phoneNumberWithDashes: string): string {
    return phoneNumberWithDashes.replace(/-/g, '');
  }
  public convertFaxNumber(faxNumberWithDashes: string): string {
    return faxNumberWithDashes.replace(/-/g, '');
  }


  save() {
    // Convert the phone number to a format without dashes
    const phoneNumberWithoutDashes = this.convertPhoneNumber(this.tribunal.tel);
    const faxNumberWithoutDashes = this.convertFaxNumber(this.tribunal.fax)
    // Save the data with the phone number without dashes
    this.tribunal.tel = phoneNumberWithoutDashes;
    this.tribunal.fax = faxNumberWithoutDashes;
    this.tribunalService.save(this.tribunal).subscribe(() => {
      this.findAll();
      this.tribunal = new Tribunal();
    });
  }
  

}
