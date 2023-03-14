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


declare const Landbot: any;

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
  region: string[] = [
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

  constructor(
    private affaireService :AffaireService,
    private tacheService: TacheService,
    private tribunalService: TribunalService, 
    private appService: AppService, 
    private utilisateurService : UtilisateurService) { }

  ngOnInit(): void {

     //===ChatBot===//
    const landbotScript = document.createElement('script');
    landbotScript.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
    landbotScript.onload = () => {
      const myLandbot = new Landbot.Livechat({
        configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-1520107-V5YKLLMHQ1HQ1NNS/index.json',
      });
    };
    document.head.appendChild(landbotScript); 
  
    //===Récupération profil utilisateur dès ouverture page===/
    this.idUser = this.appService.idUser;
    this.findProfil(this.idUser);
    this.findAllUtilisateur();

  //===Obtenir date du jour===//
  this.getDate();
  //===Nombre affaires par catégorie===//
  this.findAllAffaireAvenir();
  this.findAllAffaireEncours();
  this.findAllAffaireTraite();
  this.findAllAffaireArchive();
  this.findAllTaches()
  this.findAllTribunaux();
  this.findAllAffaires();

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
RegionTribunalCount : any;
TacheByRegion : any ;
AffaireByRegion : any;

findAllTribunaux() {
  this.tribunalService.findAllparRegion().subscribe(
    data => {
      this.tribunaux = data;
      this.RegionTribunalCount = this.countTribunauxByRegion();
    },
    error => console.error(error)
  );
}

countTribunauxByRegion() {
  const count = {};
  for (const tribunal of this.tribunaux) {
    if (!count[tribunal.region]) {
      count[tribunal.region] = 1;
    } else {
      count[tribunal.region]++;
    }
  }
  return count;
}

findAllTaches() {
  this.tacheService.findAllparRegion().subscribe(
    data => {
      this.taches = data;
      this.TacheByRegion = this.countTachesByRegion();
    },
    error => console.error(error)
  );
}

countTachesByRegion() {
  const count = {};
  for (const tache of this.taches) {
    const region = tache.tribunalFK.region;
    if (!count[region]) {
      count[region] = 1;
    } else {
      count[region]++;
    }
  }
  return count;
}

findAllAffaires() {
  this.affaireService.findAllparRegion().subscribe(
    data => {
      console.log('Données de toutes les affaires : ', data);
      this.affaires = data;
      this.AffaireByRegion = this.countAffairesByRegion();
    },
    error => console.error(error)
  );
}

countAffairesByRegion() {
  const count = {};
  for (const affaire of this.affaires) {
    const tache = affaire.taches ? affaire.taches[0] : null;
    console.log('tache de l\'affaire : ', tache);
    const region = tache ? tache.tribunalFK.region : null;
    console.log('Region de l\'affaire : ', region);
    if (region) {
      if (!count[region]) {
        count[region] = 1;
      } else {
        count[region]++;
      }
    }
  }
  return count;
}


//===Récupération profil utilisateur méthode===//
findProfil(id:number){
  this.utilisateurService.findOne(id).subscribe(data => {this.user =data;})
}

findAllUtilisateur(){
  this.utilisateurService.findAll().subscribe(data => {this.user = data });
}

}