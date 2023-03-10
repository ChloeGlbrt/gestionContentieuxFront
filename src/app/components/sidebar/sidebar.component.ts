import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [


  { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
  { path: '/phase', title: 'Phase', icon: 'education_paper', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
  { path: '/upgrade', title: 'Disconnect', icon: 'media-1_button-power', class: 'active active-pro' },
  { path: '/login', title: 'Login', icon: 'users_single-02', class: '' },
  { path: '/role', title: 'Role', icon: 'users_single-02', class: '' },
  { path: '/utilisateur', title: 'Users', icon: 'users_single-02', class: '' },
  { path: '/tribunaux' , title: 'Court', icon :'business_bank', class: ''},
  { path: '/accueil', title: 'Home', icon: 'shopping_shop', class: ''},
  { path: '/affaires', title: 'Affaires', icon:'', class: ''  },
  { path: '/documents', title: 'Documents', icon:'', class:'' },


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  };
  authenticated() {
    return this.appService.authenticated;
  }

  logout() {
    this.appService.logout();
  }
}

