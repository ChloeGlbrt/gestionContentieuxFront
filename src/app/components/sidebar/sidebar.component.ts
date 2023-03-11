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


  { path: '/accueil', title: 'Home', icon: 'shopping_shop', class: '' },
  { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },
  { path: '/login', title: 'Login', icon: 'users_single-02', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'business_badge', class: '' },
  { path: '/tache', title: 'Tasks', icon: 'business_bank', class: '' },
  { path: '/tribunaux', title: 'Courts', icon: 'business_bank', class: '' },
  { path: '/phase', title: 'Phases', icon: 'education_paper', class: '' },
  { path: '/affaires', title: 'Cases', icon: 'business_briefcase-24', class: '' },
  { path: '/documents', title: 'Documents', icon: 'education_agenda-bookmark', class: '' },
  { path: '/role', title: 'Roles', icon: 'users_single-02', class: '' },
  { path: '/utilisateur', title: 'Users', icon: 'users_circle-08', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'education_atom', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' },
  // { path: '/login', title: 'Disconnect', icon: 'media-1_button-power', class: 'active active-pro' },

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

