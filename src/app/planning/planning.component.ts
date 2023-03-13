import { Component, OnInit } from '@angular/core';
import { AffaireComponent } from '../affaire/affaire.component';
import { AffaireService } from '../services/affaire.service';
import { PlanningService } from '../services/planning.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent implements OnInit {
  calendarOptions: any;
  affaires!: any[];
  constructor(private planningService: PlanningService, private affaireService: AffaireService) { }

  ngOnInit(): void {
    //this.findAllAffaire();
    //this.calendarOptions = this.planningService.calendarOptions;
  }
  findAllAffaire() {
    this.affaireService.findAll().subscribe(data => { this.affaires = data; });
  }
}
