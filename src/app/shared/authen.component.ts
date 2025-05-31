import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post('https://tp-angular.onrender.com/api/auth/register', { username, password });
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
        const response = await firstValueFrom(
            this.http.post<{ token: string }>('https://tp-angular.onrender.com/api/auth/login', { username, password })
        );
        if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
}

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get<any>('https://tp-angular.onrender.com/api/auth/me');
  }

  // Ajoutez cette méthode pour vérifier si l'utilisateur est admin
  async checkAdmin(): Promise<void> {
    try {
      const user = await firstValueFrom(this.getCurrentUser());
      console.log('Utilisateur courant:', user);
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'utilisateur courant', err);
    }
  }
}