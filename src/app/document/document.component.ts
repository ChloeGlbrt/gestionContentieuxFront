import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from '../models/document';
import { DocumentService } from '../services/document.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { map } from 'pdfmake/build/pdfmake';
import pdffonts from 'pdfmake/build/vfs_fonts';
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
    this.findAllDocument();
  }
  
  findAllDocument(){
    this.documentService.findAll().subscribe(data => {this.documents = data;});
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

editDocument(document: Document) {
  localStorage.removeItem("editDocumentId");
  localStorage.setItem("editDocumentId", document.idDocument.toString());
  this.router.navigate(['/editDocument', document.idDocument]);
}

}
