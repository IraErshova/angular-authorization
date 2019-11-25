import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  login(form: {username: string; password: string}): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/login`, form)
      .pipe(
        tap(user => this.user$.next(user))
      );
  }

  logout(): void {
    this.user$.next(null);
  }
}
