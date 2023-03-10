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

  login() {
    this.appService.authenticate(this.credentials, () => { this.router.navigateByUrl("/user-profile") });

  }

  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }
}
