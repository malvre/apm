import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  http = inject(HttpClient);

  constructor() {
    this.checkToken();
  }

  checkToken() {
    const res = localStorage.getItem(TOKEN_KEY);
    if (res) {
      this.authenticationState.next(true);
    }
  }

  login() {
    this.http
      .post(`${environment.api}/login`, {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      })
      .subscribe((result: any) => {
        if (result) {
          localStorage.setItem(TOKEN_KEY, result.token);
          this.authenticationState.next(true);
        }
      });
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticationState.next(false);
  }

  get isAuthenticated() {
    return this.authenticationState.value;
  }

  get token() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  }
}
