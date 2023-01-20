import { Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

export const userRoutes: Routes = [
  {
    path: '',
    title: 'Users',
    pathMatch: 'full',
    component: UserListComponent,
  },
  {
    path: ':id',
    title: 'User detail',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
];
