import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

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
import { DocumentService } from './services/document.service';
import { AffaireService } from './services/affaire.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
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
    RoleComponent

  ],
  providers: [AffaireService, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
