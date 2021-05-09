import { Routes } from '@angular/router';

export const DEFAULT_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule)
  }
]
