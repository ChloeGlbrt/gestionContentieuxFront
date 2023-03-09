import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EditTribunalComponent } from '../../edit/edit-tribunal/edit-tribunal.component';
import { TribunalComponent } from '../../tribunal/tribunal.component';
import { AccueilComponent } from '../../accueil/accueil.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
  //  { path: 'table-list',     component: TableListComponent },
  //  { path: 'typography',     component: TypographyComponent },
  //  { path: 'icons',          component: IconsComponent },
  //  { path: 'maps',           component: MapsComponent },
  //  { path: 'notifications',  component: NotificationsComponent },
    { path :'editTribunal/:id', component:EditTribunalComponent},
    { path :'tribunaux', component:TribunalComponent},
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'accueil', component:AccueilComponent}
];
