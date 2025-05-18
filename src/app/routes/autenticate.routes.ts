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
      }
    ],
  }
];
