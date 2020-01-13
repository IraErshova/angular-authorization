import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/user.interface';
import { LocalStorageService } from './local-storage.service';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject(null);

  constructor(private http: HttpClient,
              private localStorageService: LocalStorageService) { }

  login(form: {username: string; password: string}): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/login`, form)
      .pipe(
        tap(response => {
          this.user$.next(response.user);
          this.setToken('token', response.accessToken);
          this.setToken('refreshToken', response.refreshToken);
        })
      );
  }

  logout(): void {
    this.user$.next(null);
    this.localStorageService.removeItem('token');
    this.localStorageService.removeItem('refreshToken');
  }

  private setToken(key: string, token: string): void {
    this.localStorageService.setItem(key, token);
  }
}
