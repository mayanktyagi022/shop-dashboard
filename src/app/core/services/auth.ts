import { Injectable } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

const STORED_USERS_KEY = 'app_registered_users';

/** Demo users for mock login (email -> password). Replace with real API later. */
const DEMO_USERS: Record<string, string> = {
  'demo@example.com': 'demo123',
  'admin@example.com': 'admin123'
};

function getStoredUsers(): Record<string, string> {
  try {
    const raw = localStorage.getItem(STORED_USERS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function saveStoredUsers(users: Record<string, string>): void {
  localStorage.setItem(STORED_USERS_KEY, JSON.stringify(users));
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(credentials: LoginCredentials): boolean {
    if (!credentials.email?.trim() || !credentials.password) {
      return false;
    }
    const email = credentials.email.trim().toLowerCase();
    const expectedPassword = DEMO_USERS[email] ?? getStoredUsers()[email];
    if (!expectedPassword || expectedPassword !== credentials.password) {
      return false;
    }
    localStorage.setItem('token', 'fake-jwt-' + Date.now());
    localStorage.setItem('role', 'user');
    localStorage.setItem('userEmail', email);
    return true;
  }

  signup(credentials: SignupCredentials): boolean {
    if (!credentials.name?.trim() || !credentials.email?.trim() || !credentials.password) {
      return false;
    }
    const email = credentials.email.trim().toLowerCase();
    const users = getStoredUsers();
    users[email] = credentials.password;
    saveStoredUsers(users);
    localStorage.setItem('token', 'fake-jwt-' + Date.now());
    localStorage.setItem('role', 'user');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', credentials.name.trim());
    return true;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  /** Display name (set on signup), or email if not set. */
  getUserName(): string {
    return localStorage.getItem('userName') || this.getUserEmail() || 'Guest';
  }
}
