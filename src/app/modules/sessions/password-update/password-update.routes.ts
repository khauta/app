import { Route } from '@angular/router';
import { LoginComponent } from './../login/login.component';
import { RegisterComponent } from './../register/register.component';
import { PasswordUpdateComponent } from './password-update.component'; // Import the new component

export const SESSION_ROUTE: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: 'register', component: RegisterComponent },
  { path: 'update-password', component: PasswordUpdateComponent }, // Add the new route
  // Potentially add routes for forgot-password if not already present
];