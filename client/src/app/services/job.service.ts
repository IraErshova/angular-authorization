import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Job } from '../interfaces/job.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  getJobList(userId: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${environment.apiUrl}/job-list`, {
      params: {
        userId
      }
    });
  }
}
