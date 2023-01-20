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

  get(id: number) {
    return this.http.get<any>(`${environment.api}/users/${id}`);
  }

  add(user: any) {
    return this.http.post(`${environment.api}/users`, user);
  }

  update(user: any, id: number) {
    return this.http.put(`${environment.api}/users/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.api}/users/${id}`);
  }
}
