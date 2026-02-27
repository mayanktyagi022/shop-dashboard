import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css']
})
export class ProductListComponent {
  products = [
    { id: 1, name: 'Laptop', image: 'https://picsum.photos/seed/laptop/600/400' },
    { id: 2, name: 'Phone', image: 'https://picsum.photos/seed/phone/600/400' },
    { id: 3, name: 'Headphones', image: 'https://picsum.photos/seed/headphones/600/400' },
    { id: 4, name: 'Gaming Console', image: 'https://picsum.photos/seed/console/600/400' },
    { id: 5, name: 'Sneakers', image: 'https://picsum.photos/seed/sneakers/600/400' },
    { id: 6, name: 'Backpack', image: 'https://picsum.photos/seed/backpack/600/400' }
  ];

  constructor(private auth: AuthService) {}

  logout(): void {
    this.auth.logout();
  }

  get userEmail(): string | null {
    return this.auth.getUserEmail();
  }
}
