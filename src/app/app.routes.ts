import { Routes } from '@angular/router';
import { authRoutes } from './routes/auth.routes';
import { HomePageComponent } from './components/router/home-page/home-page.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const routes: Routes = [


  {
    path: '',
    component: HomePageComponent,
    canActivate: [() => inject(AuthService).isAuthenticated()],
  },

  ...authRoutes

];
