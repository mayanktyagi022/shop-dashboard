import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  stats = [
    { label: 'Total orders', value: '12', icon: '📋', trend: '+2 this week' },
    { label: 'Products in catalog', value: '24', icon: '📦', trend: '' },
    { label: 'Cart items', value: '3', icon: '🛒', trend: '' }
  ];

  quickLinks = [
    { title: 'Products', description: 'Browse and manage products', href: '/products', icon: '📦' },
    { title: 'Add product', description: 'Create a new product', href: '/products/new', icon: '➕' },
    { title: 'Cart', description: 'View your cart', href: '/cart', icon: '🛒' }
  ];

   productsMenuOpen = false;
   cartMenuOpen = false;

  constructor(private auth: AuthService) {}

  get userName(): string {
    return this.auth.getUserName();
  }

  get userEmail(): string | null {
    return this.auth.getUserEmail();
  }

  logout(): void {
    this.auth.logout();
  }

  toggleProductsMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.productsMenuOpen = !this.productsMenuOpen;
    if (this.productsMenuOpen) {
      this.cartMenuOpen = false;
    }
  }

  toggleCartMenu(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartMenuOpen = !this.cartMenuOpen;
    if (this.cartMenuOpen) {
      this.productsMenuOpen = false;
    }
  }
}
