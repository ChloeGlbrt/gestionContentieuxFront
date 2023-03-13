import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { reference } from '@popperjs/core';
import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { map, mergeMap } from 'rxjs/operators';
import { Affaire } from '../models/affaire';
import { DocumentService } from './document.service';

@Injectable({
  providedIn: 'root'
})
export class AffaireService {
  private BASE_URL = "http://localhost:8080/affaires"

  public affaires: Affaire[];
  affaire:Affaire = new Affaire();
  constructor(private httpClient:HttpClient, private documentService:DocumentService) { }


  /*public findAll() : Observable<any>
  {return this.httpClient.get(this.BASE_URL);}
*/

public findAll(): Observable<any> {
  return this.httpClient.get(this.BASE_URL).pipe(
    tap((affaires: Affaire[]) => this.affaires = affaires)
  );
}
  public save(affaire:any) : Observable<any>
  {return this.httpClient.post(this.BASE_URL, affaire);}

  public delete(id:number) : Observable<any>
  {return this.httpClient.delete(this.BASE_URL + "/" + id);}

  public findOne(id:number) : Observable<any>
  {return this.httpClient.get(this.BASE_URL + "/" + id);}

  public update(affaire:any) : Observable <any>{
    var affaireJSON = JSON.parse(affaire);
    return this.httpClient.put(this.BASE_URL + "/" + affaireJSON.idAffaire, affaireJSON);
  }
  public rechercher(reference:string):Observable<any>{
    return this.httpClient.get(this.BASE_URL+"/"+reference);
  }


  //===Pour le graphique===//
  getAffairesByMonth(): { [month: number]: number } {
    const affairesByMonth = {};
    this.affaires.forEach(affaire => {
      const dateObject = new Date(affaire.dateAffaire);
      const month = dateObject.getMonth();
      if (affairesByMonth[month]) {
        affairesByMonth[month]++;
      } else {
        affairesByMonth[month] = 1;
      }
    });
    return affairesByMonth;
  }

  // Recuperer nombre de documents //
    
  getDocumentsByAffaire(): { [affaireId: number]: number } {
    const documentsByAffaire = {};
    this.affaires.forEach(affaire => {
      this.documentService.getDocumentsByReference(affaire.reference).subscribe(documents => {
        documentsByAffaire[affaire.idAffaire] = documents.length;
      });
    });
    return documentsByAffaire;
  }
  

}
