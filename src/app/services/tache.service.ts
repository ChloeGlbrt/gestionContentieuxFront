import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private BASE_URL = "http://localhost:8080/taches";
  
  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }
  
  public save(tache: any): Observable<any> {
    return this.httpClient.post(this.BASE_URL, tache);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + "/" + id);
  }
  public findOne(id: number): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/' + id);
  }
  public update(tache: any): Observable<any> {
    var tacheJson = JSON.parse(tache);
    return this.httpClient.put(this.BASE_URL + "/" + tacheJson.idTache, tacheJson);
  }

}
