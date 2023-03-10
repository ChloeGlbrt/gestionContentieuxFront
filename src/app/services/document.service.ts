import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  private BASE_URL = "http://localhost:8080/documents"
  constructor(private httpClient:HttpClient) { }

  public findAll() : Observable<any>
  { return this.httpClient.get(this.BASE_URL)}

  public findOne(id:number): Observable<any>
  { return this.httpClient.get(this.BASE_URL + "/" + id)}

  public save(document:any) : Observable<any>
  {return this.httpClient.post(this.BASE_URL, document)}

  public delete(id:number) : Observable<any>
  { return this.httpClient.delete(this.BASE_URL + "/" + id)}

  public update(document:any) : Observable<any>{
    var documentJSON = JSON.parse(document)
    return this.httpClient.put(this.BASE_URL + "/" + documentJSON.idDocument, documentJSON)
  }
  }
