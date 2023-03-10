import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Role } from '../models/role';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {

  roles!: any[];
  role: Role = new Role();

  constructor(private roleService: RoleService, private appService: AppService, private router: Router) {

  }

  ngOnInit(): void {
    this.findAllRole();
  }

  findAllRole() {
    this.roleService.findAll().subscribe(data => { this.roles = data; });
  }

  saveRole() {
    this.roleService.save(this.role).subscribe(
      () => {
        this.findAllRole();
        this.role = new Role();
      }
    )
  }
  deleteRole(id: number) {
    this.roleService.delete(id).subscribe(
      () => {
        this.findAllRole();
      }
    )
  }
  authenticated() {
    return this.appService.authenticated;
  }
  // Gestion des profils :
  authorities() {
    if (this.appService.isAdmin) {
      return false;
    } else {
      return true;
    }
  }
  authorities2() {
    if (this.appService.isAvocat == true) {
      return false;
    } else {
      return true;
    }
  }
  authorities3() {
    if (this.appService.isResponsable == true) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this.appService.logout();
  }
}

