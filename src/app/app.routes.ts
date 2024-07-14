import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth.routes';
import { HomePageComponent } from './components/router/home-page/home-page.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { LoginPageComponent } from './components/router/login-page/login-page.component';
import { NotFoundComponent } from './components/router/not-found/not-found.component';

export const routes: Routes = [

  {
    path: '',
    component: LoginPageComponent,
  },

  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()],
  },




  ...authRoutes,

  {
    path: '**',
    component: NotFoundComponent,
  },

];
