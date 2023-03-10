import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { FullCalendarModule } from '@fullcalendar/angular';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { TribunalComponent } from './tribunal/tribunal.component';
import { PhaseComponent } from './phase/phase.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { TacheComponent } from './tache/tache.component';
import { AffaireComponent } from './affaire/affaire.component';
import { DocumentComponent } from './document/document.component';
import { RoleComponent } from './role/role.component';
import { EditPhaseComponent } from './edit/edit-phase/edit-phase.component';
import { EditUtilisateurComponent } from './edit/edit-utilisateur/edit-utilisateur.component';
import { LoginComponent } from './login/login.component';
import { EditTribunalComponent } from './edit/edit-tribunal/edit-tribunal.component';
import { AccueilComponent } from './accueil/accueil.component';
import { EditAffaireComponent } from './edit/edit-affaire/edit-affaire.component';
import { EditDocumentComponent } from './edit/edit-document/edit-document.component';
import { AffaireService } from './services/affaire.service';
import { PlanningComponent } from './planning/planning.component';
import { EditTacheComponent } from './edit/edit-tache/edit-tache.component';





@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FullCalendarModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    TribunalComponent,
    PhaseComponent,
    UtilisateurComponent,
    TacheComponent,
    AffaireComponent,
    DocumentComponent,
    RoleComponent,
    EditPhaseComponent,
    EditUtilisateurComponent,
    EditTribunalComponent,
    AccueilComponent,
    LoginComponent,
    EditAffaireComponent,
    EditDocumentComponent,
    PlanningComponent,
    EditTacheComponent,
  ],
  providers: [AffaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
