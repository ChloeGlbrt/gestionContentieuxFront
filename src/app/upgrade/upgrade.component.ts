import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  constructor(private router: Router, private appService: AppService) { }

  ngOnInit() {
  }

  authenticated() {
    return this.appService.authenticated; // authenticated = false par défaut
  }

  logout() {
    this.appService.logout();
  }

}

