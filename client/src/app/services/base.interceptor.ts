import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.localStorageService.getItem('token');

    // If there is token then add Authorization header otherwise don't change request
    const requestData = accessToken
      ? req.clone({setHeaders: {Authorization: `Bearer ${accessToken}`}})
      : req;

    return next.handle(requestData).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.body) {
          if (event.body.accessToken) {
            this.localStorageService.setItem('token', event.body.accessToken);
          }

          if (event.body.refreshToken) {
            this.localStorageService.setItem('refreshToken', event.body.refreshToken);
          }
        }
      }));
  }
}
