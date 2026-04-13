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
