# Stay Signed In Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a "Stay signed in" checkbox to the login form that switches token storage from `sessionStorage` (default, session-only) to `localStorage` (persistent across tabs/restarts).

**Architecture:** `AuthService` gains a private `_persistSession` signal set at login time. All token reads, writes, and clears use the storage target indicated by that signal. `LoginComponent` adds a `staySignedIn` form control and passes it to `login()`.

**Tech Stack:** Angular 21, Angular Material (`MatCheckbox`), `localStorage` / `sessionStorage`, Angular signals

---

### Task 1: Update AuthService to support sessionStorage and the persist flag

**Files:**
- Modify: `bt-frontend/src/app/core/services/auth.service.ts`

- [ ] **Step 1: Write the failing test**

Create `bt-frontend/src/app/core/services/auth.service.spec.ts` with:

```typescript
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth.service';

const mockResponse = {
  accessToken: 'header.eyJzdWIiOiIxMjM0NTY3ODkwIn0.sig',
  refreshToken: 'refresh-token',
  accessTokenExpiry: new Date().toISOString(),
  user: { id: 1, email: 'a@b.com', displayName: 'Test', role: 'Member' as const }
};

function setup() {
  TestBed.configureTestingModule({
    providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
  });
  const service = TestBed.inject(AuthService);
  const http = TestBed.inject(HttpTestingController);
  return { service, http };
}

describe('AuthService - stay signed in', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it('stores tokens in sessionStorage when staySignedIn is false', () => {
    const { service, http } = setup();
    service.login({ email: 'a@b.com', password: 'password1' }, false).subscribe();
    http.expectOne(req => req.url.includes('/auth/login')).flush(mockResponse);
    expect(sessionStorage.getItem('access_token')).toBeTruthy();
    expect(localStorage.getItem('access_token')).toBeNull();
  });

  it('stores tokens in localStorage when staySignedIn is true', () => {
    const { service, http } = setup();
    service.login({ email: 'a@b.com', password: 'password1' }, true).subscribe();
    http.expectOne(req => req.url.includes('/auth/login')).flush(mockResponse);
    expect(localStorage.getItem('access_token')).toBeTruthy();
    expect(sessionStorage.getItem('access_token')).toBeNull();
  });

  it('clears both storages on logout', () => {
    const { service, http } = setup();
    localStorage.setItem('access_token', 'old');
    sessionStorage.setItem('access_token', 'old');
    service.login({ email: 'a@b.com', password: 'password1' }, false).subscribe();
    http.expectOne(req => req.url.includes('/auth/login')).flush(mockResponse);
    service.logout();
    http.expectOne(req => req.url.includes('/auth/revoke')).flush({});
    expect(localStorage.getItem('access_token')).toBeNull();
    expect(sessionStorage.getItem('access_token')).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd bt-frontend && npx ng test --include="**/auth.service.spec.ts" --watch=false
```

Expected: FAIL — `login` does not accept a second argument yet.

- [ ] **Step 3: Update AuthService**

Replace the contents of `bt-frontend/src/app/core/services/auth.service.ts` with:

```typescript
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

  private _persistSession = signal(false);
  private _currentUser = signal<AuthUser | null>(this.loadUserFromToken());

  currentUser = this._currentUser.asReadonly();
  isLoggedIn = computed(() => this._currentUser() !== null);
  isAdmin = computed(() => this._currentUser()?.role === 'Admin');

  login(dto: LoginDto, staySignedIn: boolean) {
    this._persistSession.set(staySignedIn);
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
    if (refreshToken) {
      this.http.post(`${environment.apiUrl}/auth/revoke`, refreshToken)
        .subscribe({ error: () => { } });
    }
    this.clearTokens();
    this._currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getAccessToken(): string | null {
    if (!this.isBrowser) return null;
    return this._persistSession()
      ? localStorage.getItem(this.ACCESS_TOKEN_KEY)
      : sessionStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser) return null;
    return this._persistSession()
      ? localStorage.getItem(this.REFRESH_TOKEN_KEY)
      : sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  private get storage(): Storage {
    return this._persistSession() ? localStorage : sessionStorage;
  }

  private handleAuthResponse(response: AuthResponse) {
    if (this.isBrowser) {
      this.storage.setItem(this.ACCESS_TOKEN_KEY, response.accessToken);
      this.storage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    }
    this._currentUser.set(response.user);
  }

  private clearTokens() {
    if (this.isBrowser) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      sessionStorage.removeItem(this.ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    }
  }

  private loadUserFromToken(): AuthUser | null {
    if (!this.isBrowser) return null;

    const token =
      localStorage.getItem(this.ACCESS_TOKEN_KEY) ??
      sessionStorage.getItem(this.ACCESS_TOKEN_KEY);

    if (!token) return null;

    // Restore persist flag based on where the token was found
    if (localStorage.getItem(this.ACCESS_TOKEN_KEY)) {
      this._persistSession.set(true);
    }

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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd bt-frontend && npx ng test --include="**/auth.service.spec.ts" --watch=false
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add bt-frontend/src/app/core/services/auth.service.ts bt-frontend/src/app/core/services/auth.service.spec.ts
git commit -m "feat: auth service uses sessionStorage by default, localStorage when staySignedIn"
```

---

### Task 2: Add staySignedIn control to LoginComponent

**Files:**
- Modify: `bt-frontend/src/app/features/auth/login/login.component.ts`
- Modify: `bt-frontend/src/app/features/auth/login/login.component.html`

- [ ] **Step 1: Update login.component.ts**

Replace the file with:

```typescript
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCheckboxModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  error = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    staySignedIn: [false]
  });

  get email() { return this.form.controls.email; }
  get password() { return this.form.controls.password; }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const { email, password, staySignedIn } = this.form.getRawValue();
    this.authService.login({ email: email!, password: password! }, staySignedIn ?? false).subscribe({
      next: () => this.router.navigate(['/bands']),
      error: err => {
        this.error.set(err.error?.error ?? 'Login failed. Please try again.');
        this.loading.set(false);
      }
    });
  }
}
```

- [ ] **Step 2: Update login.component.html**

Add the checkbox between the password field and the submit button:

```html
<div class="auth-container">
  <mat-card class="auth-card">
    <mat-card-content>
      <p class="auth-title">BandTools</p>
      <p class="auth-subtitle">Sign in</p>

      @if (error()) {
        <div class="error-banner">{{ error() }}</div>
      }

      <form [formGroup]="form" (ngSubmit)="onSubmit()">

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" placeholder="you@example.com" autocomplete="email" />
          @if (email.hasError('required')) {
            <mat-error>Email is required</mat-error>
          }
          @if (email.hasError('email')) {
            <mat-error>Enter a valid email address</mat-error>
          }
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password" placeholder="••••••••" autocomplete="current-password" />
          @if (password.hasError('required')) {
            <mat-error>Password is required</mat-error>
          }
          @if (password.hasError('minlength')) {
            <mat-error>Password must be at least 8 characters</mat-error>
          }
        </mat-form-field>

        <mat-checkbox formControlName="staySignedIn" class="stay-signed-in">
          Stay signed in
        </mat-checkbox>

        <button mat-raised-button color="primary" type="submit" [disabled]="loading()" class="full-width">
          {{ loading() ? 'Signing in...' : 'Sign in' }}
        </button>

      </form>

      <p class="form-footer">Don't have an account? <a routerLink="/register">Register</a></p>
    </mat-card-content>
  </mat-card>
</div>
```

- [ ] **Step 3: Add checkbox spacing to login.component.scss**

Read the current file first, then add at the bottom:

```scss
.stay-signed-in {
  display: block;
  margin-bottom: 1rem;
}
```

- [ ] **Step 4: Run the app and verify manually**

```bash
cd bt-frontend && ng serve --open
```

Check:
1. Checkbox appears between password field and sign-in button, unchecked by default
2. Sign in without checkbox — open DevTools → Application → Session Storage — token should be there, not in Local Storage
3. Sign in with checkbox checked — token should be in Local Storage, not Session Storage
4. Reload the page with localStorage token — should remain logged in
5. Open new tab with sessionStorage token — should NOT be logged in in the new tab

- [ ] **Step 5: Commit**

```bash
git add bt-frontend/src/app/features/auth/login/login.component.ts bt-frontend/src/app/features/auth/login/login.component.html bt-frontend/src/app/features/auth/login/login.component.scss
git commit -m "feat: add stay signed in checkbox to login form"
```
