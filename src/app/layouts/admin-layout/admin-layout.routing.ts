import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AffaireComponent } from '../../affaire/affaire.component';
import { DocumentComponent } from '../../document/document.component';
import { PhaseComponent } from '../../phase/phase.component';
import { EditPhaseComponent } from '../../edit/edit-phase/edit-phase.component';
import { RoleComponent } from '../../role/role.component';
import { UtilisateurComponent } from '../../utilisateur/utilisateur.component';
import { EditUtilisateurComponent } from '../../edit/edit-utilisateur/edit-utilisateur.component';
import { LoginComponent } from '../../login/login.component';
import { EditTribunalComponent } from '../../edit/edit-tribunal/edit-tribunal.component';
import { TribunalComponent } from '../../tribunal/tribunal.component';
import { AccueilComponent } from '../../accueil/accueil.component';
import { EditAffaireComponent } from '../../edit/edit-affaire/edit-affaire.component';
import { EditDocumentComponent } from '../../edit/edit-document/edit-document.component';
import { TacheComponent } from '../../tache/tache.component';
import { EditTacheComponent } from '../../edit/edit-tache/edit-tache.component';




export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'phase', component: PhaseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'role', component: RoleComponent },
  { path: 'utilisateur', component: UtilisateurComponent },
  { path: 'editUtilisateur/:id', component: EditUtilisateurComponent },
  //  { path: 'table-list',     component: TableListComponent },
  //  { path: 'typography',     component: TypographyComponent },
  //  { path: 'icons',          component: IconsComponent },
  //  { path: 'maps',           component: MapsComponent },
  //  { path: 'notifications',  component: NotificationsComponent },
  { path: 'affaires', component: AffaireComponent },
  { path: 'documents', component: DocumentComponent },
  { path: 'editPhase/:id', component: EditPhaseComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path :'editTribunal/:id', component:EditTribunalComponent},
  { path :'tribunaux', component:TribunalComponent},
  { path: 'upgrade',        component: UpgradeComponent },
  { path: 'accueil', component:AccueilComponent},
  { path: 'editAffaire/:id',    component:EditAffaireComponent },
  { path: 'editDocument/:id',   component:EditDocumentComponent},
    { path: 'tache', component: TacheComponent },
  { path: 'editTache/:id', component: EditTacheComponent },


];
