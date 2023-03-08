import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export const AuthInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);

  if (authService.isAuthenticated) {
    const authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.token}`,
      },
    });
    return next(authRequest).pipe(
      catchError((err) => {
        if (err.status === 401) {
          authService.logout();
        }

        const error = err.error.message || err.statusText;
        return throwError(() => new Error(error));
      })
    );
  } else {
    return next(req);
  }
};
