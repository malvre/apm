import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    title: 'Users',
    component: UserListComponent,
  },
];
