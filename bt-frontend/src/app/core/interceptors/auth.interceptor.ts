import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);

    // Attach token to request
    const authReq = addToken(req, authService.getAccessToken());

    return next(authReq).pipe(
        catchError(error => {
            // If we get a 401 and it's not the refresh endpoint itself
            // (to avoid infinite loops), try to refresh the token
            if (error instanceof HttpErrorResponse &&
                error.status === 401 &&
                !req.url.includes('/auth/refresh')) {

                return authService.refresh().pipe(
                    switchMap(response => {
                        // Retry the original request with the new token
                        return next(addToken(req, response.accessToken));
                    }),
                    catchError(refreshError => {
                        // Refresh failed — session is dead, log out
                        authService.logout();
                        return throwError(() => refreshError);
                    })
                );
            }

            return throwError(() => error);
        })
    );
};

function addToken(req: HttpRequest<unknown>, token: string | null): HttpRequest<unknown> {
    if (!token) return req;

    return req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
    });
}