import { Routes } from "@angular/router";
import { RegisterPageComponent } from "../components/router/register-page/register-page.component";
import { LoginPageComponent } from "../components/router/login-page/login-page.component";

export const authRoutes: Routes = [
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  }
]
