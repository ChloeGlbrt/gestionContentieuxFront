import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {

  private BASE_URL = "http://localhost:8080/phases"

  constructor(private httpClient: HttpClient) { }
  public findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }

  public save(phase: any): Observable<any> {
    return this.httpClient.post(this.BASE_URL, phase);
  }
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + "/" + id);
  }
  public findOne(id: number): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/' + id);
  }
  public update(phase: any): Observable<any> {
    var phaseJson = JSON.parse(phase);
    return this.httpClient.put(this.BASE_URL + "/" + phaseJson.idPhase, phaseJson);
  }
}
