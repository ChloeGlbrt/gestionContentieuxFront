import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // Authentification
  authenticated = false;
  responseAll: any;
  // Autorisation :
  isAdmin = false;
  isAvocat = false;
  isResponsable = false;
  isNothing = false;
  // Récupération des données de l'utilisateur connecté step 1
  idUser: any;
  constructor(private httpClient: HttpClient) {
    this.authenticated = localStorage.getItem('authenticated') === 'true';
    this.responseAll = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (this.authenticated) {
      for (let i = 0; i < this.responseAll['roles'].length; i++) {
        if (this.responseAll['roles'][i]['idRole'] == 1) { // Le 1 correspond à l'id role = 1 = admin dans base de données
          this.isAdmin = true;
        }
        if (this.responseAll['roles'][i]['idRole'] == 2) { // Le 2 correspond à l'id role = 2 = avocat dans base de données
          this.isAvocat = true;
        }

        if (this.responseAll['roles'][i]['idRole'] == 3) { // Le 4 correspond à l'id role = 4 = responsable dans base de données
          this.isResponsable = true;
        }
        if (this.responseAll['roles'][i]['idRole'] == '') { // Le '' correspond à l'id role = rien = utilisateur sans role
          this.isNothing = true;
        }
      }
    }

    const userData = localStorage.getItem('userData');
    if (userData) {
      this.responseAll = JSON.parse(userData);
      this.idUser = this.responseAll['idUtilisateur'];
    }
  }

  authenticate(credentials: any, callback: any) {
    const headersGerard = new HttpHeaders(
      credentials ? {
        authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
      } : {}
    );
    this.httpClient.get('http://localhost:8080/login/utilisateur', { headers: headersGerard }).subscribe(response => {
      this.responseAll = response; // objet = utilisateur
      console.log("responseAll=" + this.responseAll);

      // Récupération des données de l'utilisateur connecté step 2
      this.idUser = this.responseAll['idUtilisateur'];

      if (this.responseAll['username']) {
        this.authenticated = true;

        // vérification des profils :
        for (let i = 0; i < this.responseAll['roles'].length; i++) {
          if (this.responseAll['roles'][i]['idRole'] == 1) { // Le 1 correspond à l'id role = 1 = admin dans base de données
            this.isAdmin = true;
          }
          if (this.responseAll['roles'][i]['idRole'] == 2) { // Le 2 correspond à l'id role = 2 = avocat dans base de données
            this.isAvocat = true;
          }
          if (this.responseAll['roles'][i]['idRole'] == 3) { // Le 3 correspond à l'id role = 3 = responsable dans base de données
            this.isResponsable = true;
          }
          if (this.responseAll['roles'][i]['idRole'] == '') { // Le '' correspond à l'id role = rien = utilisateur sans role
            this.isNothing = true;
          }
        }
        this.storeUserData(this.responseAll);
        localStorage.setItem('currentUser', JSON.stringify(this.responseAll)); // Stocker l'utilisateur connecté
        localStorage.setItem('authenticated', 'true'); // indiquer que l'utilisatuer est authentifié
      } else {
        this.authenticated = false;
      }
      return callback && callback();
    })
  }

  //Stockage des données de l'utilisateur
  storeUserData(userData: any) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('userData') || '{}');
  }
  logout() {
    localStorage.removeItem('currentUser');
    localStorage.setItem('authenticated', 'false');
    this.authenticated = false;
    this.isAdmin = false;
    this.isAvocat = false;
    this.isResponsable = false;
    this.isNothing = false;
    this.responseAll = {};
    window.location.href = "./login";
  }

}
