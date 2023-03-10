import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { PhaseComponent } from '../../phase/phase.component';
import { EditPhaseComponent } from '../../edit/edit-phase/edit-phase.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'phase', component: PhaseComponent },
  //  { path: 'table-list',     component: TableListComponent },
  //  { path: 'typography',     component: TypographyComponent },
  //  { path: 'icons',          component: IconsComponent },
  //  { path: 'maps',           component: MapsComponent },
  //  { path: 'notifications',  component: NotificationsComponent },
  { path: 'upgrade', component: UpgradeComponent },
  { path: 'editPhase/:id', component: EditPhaseComponent }
];
