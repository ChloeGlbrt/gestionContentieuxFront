import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private BASE_URL = "http://localhost:8080/roles";

  // HttpClient = module qui nous permet d'utiliser les verbes http : GET POST PUT DELETE
  constructor(private httpClient: HttpClient) { }

  // findAll --> verbe http GET --> URL : BASE_URL
  // Observable --> une méthode qui vérifie  les données dans le serveur nodejs
  // Afficher la liste des utilisateurs
  public findAll(): Observable<any> {
    return this.httpClient.get(this.BASE_URL);
  }

  // save --> verbe http POST --> URL : BASE_URL + Body
  public save(role: any): Observable<any> {
    return this.httpClient.post(this.BASE_URL, role);
  }

  // delete --> verbe http DELETE --> URL : BASE_URL/id
  public delete(id: number): Observable<any> {
    return this.httpClient.delete(this.BASE_URL + "/" + id); // Pour id = 1 --> http://localhost:8080/utilisateurs/1   
  }

  // get with id --> verbe http : GET : URL : BASE_URL/id
  public findOne(id: number): Observable<any> {
    return this.httpClient.get(this.BASE_URL + '/' + id);
  }

  // put --> verbe http : PUT --> URL : BASE_URL/id et dans le body l'objet utilisateur
  public update(role: any): Observable<any> {
    var roleJSON = JSON.parse(role); // conversion de string vers format JSON
    return this.httpClient.put(this.BASE_URL + "/" + roleJSON.idRole, roleJSON);
  }
}
