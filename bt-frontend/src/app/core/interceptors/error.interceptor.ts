import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError(error => {
      if (error.status === 500) {
        // dispatch a global notification action
        console.log(error);
      }
      return throwError(() => error);
    })
  );
};