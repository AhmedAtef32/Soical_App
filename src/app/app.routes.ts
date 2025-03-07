import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedGuard } from './core/guards/logged/logged.guard';


export const routes: Routes = [
  {path: '' , redirectTo: 'home', pathMatch: 'full'},
  {path: '', canActivate: [authGuard], loadComponent: ()=> import("./core/layout/auth/auth.component").then(c => c.AuthComponent) ,children:[
    {path: '' , redirectTo: 'login', pathMatch: 'full'},
    {path: 'register' , loadComponent: ()=> import("./feature/pages/register/register.component").then(c => c.RegisterComponent) , title: 'Register'},
    {path: 'login' , loadComponent: ()=> import("./feature/pages/login/login.component").then(c => c.LoginComponent), title: 'Login'},
  ]},

  {path: '' , canActivate: [loggedGuard],  loadComponent: ()=> import("./core/layout/blank/blank.component").then(c => c.BlankComponent),children:[
    {path: '' , redirectTo: 'home', pathMatch: 'full'},
    {path: 'home' , loadComponent: ()=> import("./feature/pages/home/home.component").then(c => c.HomeComponent), title: 'Timeline'},
    {path: 'postDetails/:id' , loadComponent: ()=> import("./feature/pages/post-detailes/post-detailes.component").then(c => c.PostDetailesComponent), title: 'Post Details'},
    {path: '**' , loadComponent: ()=> import("./feature/pages/not-found/not-found.component").then(c => c.NotFoundComponent), title: 'Not Found'},
  ]},
];
