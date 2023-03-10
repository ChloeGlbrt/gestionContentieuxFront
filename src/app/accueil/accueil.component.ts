import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']

  
})
export class AccueilComponent implements OnInit {

  @ViewChild('myChart', {static: true}) myChartRef: ElementRef;
  private myChart: Chart;

  constructor() { }

  ngOnInit() {
    this.myChart = new Chart(this.myChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Cases',
          data: [10, 20, 30, 40, 50, 60, 70],
          backgroundColor: [
            'rgba(248, 63, 55, 0.2)',
            'rgba(35, 35, 35, 0.2)',
            'rgba(248, 63, 55, 0.2)',
            'rgba(35, 35, 35, 0.2)',
            'rgba(248, 63, 55, 0.2)',
            'rgba(35, 35, 35, 0.2)',
            'rgba(248, 63, 55, 0.2)'
          ],
          borderColor: [
            'rgba(248, 63, 55, 1)',
            'rgba(35, 35, 35, 1)',
            'rgba(248, 63, 55, 1)',
            'rgba(35, 35, 35, 1)',
            'rgba(248, 63, 55, 1)',
            'rgba(35, 35, 35, 1)',
            'rgba(248, 63, 55, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}