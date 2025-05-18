import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
   {
    path: '',
    loadComponent: () => import("./components/login/login.component"),
    loadChildren: () => import('./routes/auth.routes').then((r) => r.authRoutes)
  },
  {
    path: 'chamados',
    loadChildren: () => import('./routes/autenticate.routes').then((r) => r.authRoutes)
  },
    {
    path: 'minha-conta',
    loadComponent: () => import("./components/my-acount/my-acount.component"),
    canActivate: [authGuard],
  },
];
