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
   {
        path: 'redefinir-senha',
        loadComponent: () => import("./components/reset-password/reset-password.component").then(m => m.ResetPasswordComponent), //conferir com o manco pra ver se ta certo


      },
      {
        path: 'confirmar-senha',
        loadComponent: () => import("./components/reset-password/confirm-password/confirm-password.component").then(m => m.ConfirmPasswordComponent),

      },
       {
        path: 'cadastro',
        loadComponent: () => import("./components/sign-up/sign-up.component").then(m => m.SignUpComponent),

      },
];
