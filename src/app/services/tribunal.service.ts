import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tribunal } from '../models/tribunal';

@Injectable({
  providedIn: 'root'
})
export class TribunalService {

  private BASE_URL="http://localhost:8080/tribunaux";

  constructor(private httpClient : HttpClient) { }

  public findAll() : Observable<any>
  {return this.httpClient.get (this.BASE_URL);}

  public findOne(id: number) : Observable<any>
  {return this.httpClient.get(this.BASE_URL + "/" + id);}

  public save(tribunaux :any) : Observable<any>
  {return this.httpClient.post(this.BASE_URL, tribunaux);}

  public delete(id : number) : Observable<any> 
  {return this.httpClient.delete(this.BASE_URL + "/" + id);}

  public update(tribunaux:any) :Observable<any>{
    var tribunalJson =JSON.parse(tribunaux);
    return this.httpClient.put(this.BASE_URL +"/" + tribunalJson.idTribunal, tribunalJson);
  }
//==Statistiques===//
  public findAllparRegion(): Observable<Tribunal[]> {
    return this.httpClient.get<Tribunal[]>(this.BASE_URL);
  }

}
