import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  constructor() {}

  all() {
    return this.http.get<any>(`${environment.api}/users?page=1&per_page=12`);
  }
}
