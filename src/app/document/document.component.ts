import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from '../models/document';
import { DocumentService } from '../services/document.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { map } from 'pdfmake/build/pdfmake';
import pdffonts from 'pdfmake/build/vfs_fonts';
import { data } from 'jquery';
pdfMake.vfs = pdffonts.pdfMake.vfs;


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  document:Document = new Document();
  documents : any[];

  constructor(private documentService:DocumentService, private router:Router) { }

  ngOnInit(): void {
  }
  
  findAllDocument(){
    this.documentService.findAll().subscribe(data => {this.documents = data;
    /*this.createPdf(data)*/});
  }
  saveDocument(){
    this.documentService.save(this.document).subscribe(
      () => {
        this.findAllDocument();
        this.document = new Document();
      }
    )
  }

  deleteDocument(id:number){
  this.documentService.delete(id).subscribe(
    () => {
      this.findAllDocument();
    }
  )
}

/*generatePdf(){
  const doc = this.getDocument();
  pdfMake.createPdf(doc).open();
}

getDocument(){
  return {
    content: [
      {
        columns:[
          [{
            text:'Tribunal de Paris',
            style: 'name'
          },
        {
          text: 'Contentieux n° '
        },
      ]
        ]
      },
      
        this.getList(this.documentService.findAll),
      {

      },
    ],
    tableHeader:{
      bold:true,
      fontSize: 15,
      alignement: 'center'
    }

  };
}
getList(items:Document[]){
  return{
    table: {
      widths: ['*', '*', '*'],
      body:[
        [{
          text: 'Titre',
          style: 'tableHeader'
        },
        {
          text: 'Date de Creation',
          style: 'tableHeader'
        },
        {
          text: 'Description',
          style: 'tableHeader'
        }
        ],
        ...items.map(i =>{
          return [i.nom, i.dateCreation, i.description]
        })
      ]
    }
  }
}*/

createPdf(){
  const pdfDef:any = {
    content: [
      {
        columns:[
          [{
            text:'Tribunal de Paris',
          
          },
          {
            text: 'Contentieux n° '
          }],
          {
            table: {
              widths: ['*', '*', '*'],
              body:[
                [{
                  text: 'Titre',
                },
                {
                  text: 'Date de Creation',
                },
                {
                  text: 'Description',
                }],
                
                ...this.documents.map(i =>{
                  return [i.nom, i.dateCreation, i.description]
                })
              ]
            }
          }
        ]
      }
    ]
    
  };
  const pdf = pdfMake.createPdf(pdfDef);
  pdf.open(); 
}
}
