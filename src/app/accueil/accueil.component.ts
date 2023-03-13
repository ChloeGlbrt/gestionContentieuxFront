import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { Tribunal } from '../models/tribunal';
import { Tache } from '../models/tache';
import { AffaireService } from '../services/affaire.service';
import { TacheService } from '../services/tache.service';
import { TribunalService } from '../services/tribunal.service';
import { Utilisateur } from '../models/utilisateur';
import { AppService } from '../app.service';
import { UtilisateurService } from '../services/utilisateur.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

  
})
export class AccueilComponent implements OnInit {

  @ViewChild('myChart', {static: true}) myChartRef: ElementRef;
  private myChart: Chart;

  //===Liaison tache avec utilisateur connecté===//
  seletedUser! : any;
  user : Utilisateur = new Utilisateur();
  idUser : any;

  constructor(
    private affaireService :AffaireService,
    private tacheService: TacheService,
    private tribunalService: TribunalService, 
    private appService: AppService, 
    private utilisateurService : UtilisateurService) { }

  ngOnInit(): void {

    //===Récupération profil utilisateur dès ouverture page===/
    this.idUser =this.appService.idUser;
    this.findProfil(this.idUser);

  //===Obtenir date du jour===//
  this.getDate();
  //===Nombre affaires par catégorie===//
  this.findAllAffaireAvenir();
  this.findAllAffaireEncours();
  this.findAllAffaireTraite();
  this.findAllAffaireArchive();
  this.findAllTache();
  this.findAllUtilisateur();

  //===Graphique===//  
    this.affaireService.findAll().subscribe(() => {
      const affairesByMonth = this.affaireService.getAffairesByMonth();
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const data = monthNames.map((month, index) => {
        return affairesByMonth[index] || 0;
      });
  
      this.myChart = new Chart(this.myChartRef.nativeElement, {
        type: 'bar',
        data: {
          labels: monthNames,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(39, 39, 39, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 1)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 1)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 1)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 1)',
              'rgba(39, 39, 39, 0.2)',
              'rgba(255, 99, 132, 1)',
              'rgba(39, 39, 39, 0.2)'
            ],
            borderWidth: 1
          }]
        },
      options: {
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              stepSize: 1,
              beginAtZero: true
            }
          }]
        }
      }
    });
    }
  )}
//==Obtenir la date du jour===//
  getDate() {
    var today = new Date();
    var dateElement = document.getElementById("date");
    dateElement.textContent = today.toDateString();
  }

//===Nombre affaires par statut ===//
affaires! : any[];
AvenirAffaireCount! : any;
EncoursAffairecount! : any;
TraiteAffairecount! : any;
ArchiveAffairecount! : any;


findAllAffaireAvenir(){
  this.affaireService.findAll().subscribe( data => {
  this.affaires = data;
  let AvenirAffaire = this.affaires.filter(a =>a.statut === 0);
  this.AvenirAffaireCount = AvenirAffaire.length});}

findAllAffaireEncours(){
  this.affaireService.findAll().subscribe( data => {
  this.affaires = data;
  let EncoursAffaire = this.affaires.filter(a =>a.statut === 1);
  this.EncoursAffairecount = EncoursAffaire.length});}

findAllAffaireTraite(){
  this.affaireService.findAll().subscribe( data => {
  this.affaires = data;
  let TraiteAffaire = this.affaires.filter(a =>a.statut === 2);
  this.TraiteAffairecount = TraiteAffaire.length});}

findAllAffaireArchive(){
  this.affaireService.findAll().subscribe( data => {
  this.affaires = data;
  let ArchiveAffaire = this.affaires.filter(a =>a.statut === 3);
  this.ArchiveAffairecount = ArchiveAffaire.length});}


//===Nombre affaires par tribunal===//
tribunaux!: any[];
taches! : any[];
countTachesByTribunal : any;
RegionTribunalCount : any;
TacheByTribunal : any ;


findAllTribunaux() {
  this.tribunalService.findAll().subscribe(data => {
    this.tribunaux = data;
    let RegionTribunal = this.tribunaux.filter(t => t.region === 'Bretagne');
    this.RegionTribunalCount = RegionTribunal.length});
    }



findAllTache() {
  this.tribunalService.findAll().subscribe(data =>{
    this.tribunaux = data ;
    let TacheByTribunal = this.tribunaux.filter(t => t.taches)
    this.countTachesByTribunal =  TacheByTribunal.length
});
}

//===Récupération profil utilisateur méthode===//
findProfil(id:number){
  this.utilisateurService.findOne(id).subscribe(data => {this.user =data;})
}

findAllUtilisateur(){
  this.utilisateurService.findAll().subscribe(data => {this.user = data });
}

}