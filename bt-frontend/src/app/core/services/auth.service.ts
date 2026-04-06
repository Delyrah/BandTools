import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse, AuthUser, LoginDto, RegisterDto } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  // Signal holding the current user — null means not logged in
  private _currentUser = signal<AuthUser | null>(this.loadUserFromToken());

  // Public read-only access to the current user
  currentUser = this._currentUser.asReadonly();

  // Computed signals derived from currentUser
  isLoggedIn = computed(() => this._currentUser() !== null);
  isAdmin = computed(() => this._currentUser()?.role === 'Admin');

  login(dto: LoginDto) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, dto)
      .pipe(tap(response => this.handleAuthResponse(response)));
  }

  register(dto: RegisterDto) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/register`, dto)
      .pipe(tap(response => this.handleAuthResponse(response)));
  }

  refresh() {
    const refreshToken = this.getRefreshToken();
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, refreshToken)
      .pipe(tap(response => this.handleAuthResponse(response)));
  }

  logout() {
    const refreshToken = this.getRefreshToken();

    // Revoke on the server — fire and forget, don't wait for response
    if (refreshToken) {
      this.http.post(`${environment.apiUrl}/auth/revoke`, refreshToken)
        .subscribe({ error: () => { } }); // swallow errors — we're logging out anyway
    }

    this.clearTokens();
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.ACCESS_TOKEN_KEY) : null;
  }

  getRefreshToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.REFRESH_TOKEN_KEY) : null;
  }

  private handleAuthResponse(response: AuthResponse) {
    if (this.isBrowser) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    }
    this._currentUser.set(response.user);
  }

  private clearTokens() {
    if (this.isBrowser) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  // Parse the JWT payload to restore user on page refresh
  // JWT is three base64 segments separated by dots — the middle one is the payload
  private loadUserFromToken(): AuthUser | null {
    if (!this.isBrowser) return null;
    const token = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();
      if (isExpired) return null;

      return {
        id: parseInt(payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']),
        email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
        displayName: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
        role: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role']
      };
    } catch {
      return null;
    }
  }
}