import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Document } from '../../models/document';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.component.html',
  styleUrls: ['./edit-document.component.css']
})
export class EditDocumentComponent implements OnInit {

  document: Document = new Document();
  editForm!: FormGroup;

  constructor(private documentService:DocumentService, private router:Router, private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    let currentDocument = localStorage.getItem("editDocumentId");
    if(!currentDocument) {
      alert("Invalid Action");
      this.router.navigate(["/documents"])
      return;
    }
    this.editForm = this.formBuilder.group({
      idDocument: [],
      dateCreation: ['', Validators.required],
      nom: ['', Validators.required],
      description: ['', Validators.required],
    })
    this.documentService.findOne(+currentDocument).subscribe(data => {
      this.editForm.setValue(data);
    });
  }

  updateDocument(){
    var documentJson = JSON.stringify(this.editForm.value);
    this.documentService.update(documentJson).subscribe(() => {
      this.router.navigate(['/documents'])
    });
  }
}
