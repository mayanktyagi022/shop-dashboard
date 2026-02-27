import { Routes } from '@angular/router';

export const PRODUCT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-list/product-list').then(c => c.ProductListComponent),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./product-form/product-form').then(c => c.ProductForm),
  },
];
