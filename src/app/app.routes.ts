import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: ()=> import("./core/layout/auth/auth.component").then(c => c.AuthComponent) ,children:[
    {path: '' , redirectTo: 'login', pathMatch: 'full'},
    {path: 'register' , loadComponent: ()=> import("./feature/pages/register/register.component").then(c => c.RegisterComponent)},
    {path: 'login' , loadComponent: ()=> import("./feature/pages/login/login.component").then(c => c.LoginComponent)},
  ]},

  {path: '' , loadComponent: ()=> import("./core/layout/blank/blank.component").then(c => c.BlankComponent),children:[
    {path: '' , redirectTo: 'home', pathMatch: 'full'},
    {path: 'home' , loadComponent: ()=> import("./feature/pages/home/home.component").then(c => c.HomeComponent)},
  ]},
];
