import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = { username: '', password: '' }


  constructor(private appService: AppService, private httpClient: HttpClient, private router: Router) { }

  noOnInit(): void {

  }

  // Problème pour afficher seconde alert

  login() {
    this.appService.authenticate(this.credentials, (authenticate) => {
      if (authenticate = true) {
        alert('Authentification réussie')
        console.log(authenticate);
        this.router.navigateByUrl("/accueil")
      } else if (authenticate.responseAll.statutCompte !== true) {
        alert('Votre compte est désactivé, veuillez contacter un administrateur.');
      }
    });
  }

  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }
}
