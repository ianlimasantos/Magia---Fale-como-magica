import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { GeneratedActivityModel } from '../models/generated-activity/generated-activity-model';

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

  getGeneratedActivity(generatedActivityId: string) {
    return this.httpClient.get<GeneratedActivityModel>(`${this.apiUrl}/generated-activities/flashcard/${generatedActivityId}`);
  }

  getCompleteGeneratedActivity(generatedActivityId: string) {
    return this.httpClient.get<GeneratedActivityModel>(`${this.apiUrl}/generated-activities/complete/${generatedActivityId}`);
  }

  getMultipleChoiceGeneratedActivity(generatedActivityId: string) {
    return this.httpClient.get<GeneratedActivityModel>(`${this.apiUrl}/generated-activities/multiple-choice/${generatedActivityId}`);
  }

}

