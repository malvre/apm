import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService);

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated) {
      console.log('intercepted and authenticated', this.authService.token);

      const authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`,
        },
      });
      return next.handle(authRequest).pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.authService.logout();
          }

          const error = err.error.message || err.statusText;
          return throwError(() => new Error(error));
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
