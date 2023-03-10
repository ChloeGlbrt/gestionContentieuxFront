import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { Affaire } from '../models/affaire';

@Injectable({
  providedIn: 'root'
})
export class AffaireService {
  private BASE_URL = "http://localhost:8080/affaires"

  public affaires: Affaire[];
  constructor(private httpClient:HttpClient) { }

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

}
