import { Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

export const userRoutes: Routes = [
  {
    path: '',
    title: 'Users',
    pathMatch: 'full',
    component: UserListComponent,
  },
  {
    path: 'new',
    title: 'New user',
    pathMatch: 'full',
    component: UserEditComponent,
  },
  {
    path: ':id',
    title: 'User detail',
    pathMatch: 'full',
    component: UserDetailComponent,
  },
  {
    path: ':id/edit',
    title: 'User edit',
    pathMatch: 'full',
    component: UserEditComponent,
  },
];
