import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UserActivityProgressHistoryModel } from '../models/userActivityProgress/user-activity-progress-history-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserActivityProgressHistoricService {

 httpClient= inject(HttpClient);
 apiUrl = environment.apiUrl;

  getHistoricByType(type: string) : Observable<UserActivityProgressHistoryModel[]> {
    return this.httpClient.get<UserActivityProgressHistoryModel[]>(`${this.apiUrl}/user-activity-progress/type/${type}`);
  }
}
