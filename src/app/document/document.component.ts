import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from '../models/document';
import { DocumentService } from '../services/document.service';
import pdfMake from 'pdfmake/build/pdfmake';
import { map } from 'pdfmake/build/pdfmake';
import pdffonts from 'pdfmake/build/vfs_fonts';
import { AppService } from '../app.service';
import { Affaire } from '../models/affaire';
import { AffaireService } from '../services/affaire.service';
pdfMake.vfs = pdffonts.pdfMake.vfs;


@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  document: Document = new Document();
  affaire : Affaire = new Affaire();

  documents!: any[];
  affaireFK!:any[];

  constructor(private documentService: DocumentService, private router: Router, private appService: AppService, private affaireService:AffaireService) { }

  ngOnInit(): void {
    this.findAllDocument();
    this.findAllAffaire();
  }

  findAllDocument() {
    this.documentService.findAll().subscribe(data => { this.documents = data; });
  }

  findAllAffaire(){
    this.affaireService.findAll().subscribe(data => { this.affaireFK = data});
  }

  saveDocument() {
    this.affaire.documents = this.document;
    this.documentService.save(this.document).subscribe(
      () => {
        this.findAllDocument();
        this.document = new Document();
      }
    )
  }

  deleteDocument(id: number) {
    this.documentService.delete(id).subscribe(
      () => {
        this.findAllDocument();
      }
    )
  }

  createPdf() {
    const pdfDef: any = {
      content: [
        {
          columns: [
            [{
              text: 'Tribunal de Paris',

            },
            {
              text: 'Contentieux n° '
            }],
            {
              table: {
                widths: ['*', '*', '*'],
                body: [
                  [{
                    text: 'Titre',
                  },
                  {
                    text: 'Date de Creation',
                  },
                  {
                    text: 'Description',
                  }],

                  ...this.documents.map(i => {
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
  authenticated() {
    return this.appService.authenticated;
  }
  // Gestion des profils :
  authorities() {
    if (this.appService.isAdmin) {
      return false;
    } else {
      return true;
    }
  }
  authorities2() {
    if (this.appService.isAvocat == true) {
      return false;
    } else {
      return true;
    }
  }
  authorities3() {
    if (this.appService.isResponsable == true) {
      return false;
    } else {
      return true;
    }
  }
  authorities4() {
    if (this.appService.isNothing == true) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.appService.logout();
  }
}

