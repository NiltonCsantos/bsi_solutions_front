import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path:'',
    loadComponent:()=> import("../components/main/main.component"),
    children:[
      {
        path:'',
        loadComponent:()=> import("../components/tickets/tickets.component")
      },
      {
        path:'solicitar',
        loadComponent:()=> import("../components/tickets/form/form.component")
      }
    ]
  }
];
