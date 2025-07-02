import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  BASE_URL = `${environment.baseUrl}`;
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>(this.BASE_URL+'/api/auth/login', { email, password });
  }

  register(user: any) {
    return this.http.post<any>(this.BASE_URL+'/api/auth/register', user);
  }

  setSession(token: string, role: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  logout() {
    localStorage.clear();
    this.currentUser.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string {
    return localStorage.getItem('role') || '';
  }
}