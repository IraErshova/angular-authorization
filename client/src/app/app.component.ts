import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './services/auth.service';
import { User } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user$: Observable<User>;
  user: User;

  constructor(private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.getCurrentUser().pipe(share());
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
