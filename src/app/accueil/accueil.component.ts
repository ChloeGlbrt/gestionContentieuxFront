import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AffaireService } from '../services/affaire.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

  
})
export class AccueilComponent implements OnInit {

  @ViewChild('myChart', {static: true}) myChartRef: ElementRef;
  private myChart: Chart;

  constructor(private affaireService :AffaireService) { }

  ngOnInit(): void {

  //===Obtenir date du jour===//
  this.getDate();
  //===Nombre affaires par catégorie===//
  this.findAllAffaireAvenir();
  this.findAllAffaireEncours();
  this.findAllAffaireTraite();
  this.findAllAffaireArchive();

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


  


}