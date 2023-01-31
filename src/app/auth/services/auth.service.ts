import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { LoadingService } from 'src/app/commons/services/loading/loading.service';
import { ToastService } from 'src/app/commons/services/toaster/toast.service';
import { environment } from 'src/environments/environment';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authenticationState = new BehaviorSubject(false);

  http = inject(HttpClient);
  loadingService = inject(LoadingService);
  toastService = inject(ToastService);

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
    this.loadingService.show();
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
        this.loadingService.hide();
      });
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.authenticationState.next(false);
  }

  async register() {
    try {
      this.loadingService.show();

      const response: any = await lastValueFrom(
        this.http.post(`${environment.api}/register`, {
          email: 'eve.holt@reqres.in',
          password: 'pistol',
        })
      );

      this.toastService.showSuccessToast('Great', 'Account created!');
      localStorage.setItem(TOKEN_KEY, response.token);
      this.authenticationState.next(true);
    } catch (error) {
      this.toastService.showErrorToast(
        'Ops',
        'Error creating account, please check your email address and password and try again'
      );
    } finally {
      this.loadingService.hide();
    }
  }

  get isAuthenticated() {
    return this.authenticationState.value;
  }

  get token() {
    const token = localStorage.getItem(TOKEN_KEY);
    return token;
  }
}
