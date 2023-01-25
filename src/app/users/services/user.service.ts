import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  constructor() {}

  all(): Observable<User[]> {
    return this.http
      .get<any>(`${environment.api}/users?page=1&per_page=12`)
      .pipe(
        map((res) => res.data),
        take(1)
      );
  }

  get(id: number): Observable<User> {
    return this.http.get<any>(`${environment.api}/users/${id}`).pipe(
      map((res) => res.data),
      take(1)
    );
  }

  add(user: User) {
    return this.http.post(`${environment.api}/users`, user);
  }

  update(user: User, id: number) {
    return this.http.put(`${environment.api}/users/${id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.api}/users/${id}`);
  }
}
