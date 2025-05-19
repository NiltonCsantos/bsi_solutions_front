import { Routes } from '@angular/router';
import { authGuard } from '../guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import("../components/main/main.component"),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import("../components/tickets/tickets.component")
      },
      {
        path: 'solicitar',
        loadComponent: () => import("../components/tickets/form/form.component")
      },
      {
        path: 'solicitar/:id',
        loadComponent: () => import("../components/tickets/form/form.component")
      },
      {
        path: 'profissionais',
        loadComponent: () => import("../components/professionals/professionals.component"),
        canActivate: [authGuard],
      },
       {
        path: 'cadastrar-profissionais',
        loadComponent: () => import("../components/professionals/form/form.component"),
        canActivate: [authGuard],
      },
      {
        path: 'cadastrar-profissionais/:id',
        loadComponent: () => import("../components/professionals/form/form.component"),
        canActivate: [authGuard],
      },
      {
        path: 'dashboards',
        loadComponent: () => import("../components/dashboards/dashboards.component"),
        canActivate: [authGuard],
      },
    ],
  }
];
