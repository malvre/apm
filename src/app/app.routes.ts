import { Routes } from '@angular/router';
import { authGuard } from './auth/services/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/pages/auth.routes').then((routes) => routes.authRoutes),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/pages/user.routes').then((routes) => routes.userRoutes),
    canActivate: [authGuard],
  },
];
