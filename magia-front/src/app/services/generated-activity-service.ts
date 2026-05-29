import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class GeneratedActivityService {

  httpClient = inject(HttpClient);
  apiUrl = environment.apiUrl;

  registerProgress(generatedActivityId: string, userId: string, rights: number, quantity: number) {
    return this.httpClient.post(`${this.apiUrl}/user-activity-progress/create`, {
      generatedActivityId,
      userId,
      rights,
      quantity
    });
  }
}
