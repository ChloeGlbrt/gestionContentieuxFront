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
  
  save() {this.tribunalService.save(this.tribunal).subscribe(() => {this.findAll(); this.tribunal = new Tribunal()});}

  delete(id :number) {this.tribunalService.delete(id).subscribe(() => {this.findAll()});}

  editTribunal (tribunal:Tribunal){
    localStorage.removeItem("editTribunalId");
    localStorage.setItem("editTribunalId", tribunal.idTribunal.toString());
    this.router.navigate(['/editTribunal',tribunal.idTribunal]);
  }

}
