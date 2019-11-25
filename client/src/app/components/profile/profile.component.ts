import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { JobService } from '../../services/job.service';
import { User } from '../../interfaces/user.interface';
import { Job } from '../../interfaces/job.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User;
  userSub: Subscription;
  jobList$: Observable<Job[]>;

  constructor(private authService: AuthService,
              private jobService: JobService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user$.subscribe((user: User) => {
      this.user = user;
      this.jobList$ = this.jobService.getJobList(user.id);
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
