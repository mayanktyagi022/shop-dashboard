import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then(c => c.LoginComponent)
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./auth/signup/signup').then(c => c.SignupComponent)
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./dashboard/dashboard/dashboard').then(c => c.DashboardComponent)
  },
  {
    path: 'products',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./products/products.routes').then(r => r.PRODUCT_ROUTES)
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./cart/cart/cart').then(c => c.Cart)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
];
