import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { CreateCompleteOpenAiDto } from '../models/completeActivity/create-complete-openAi-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompleteService {

  apiUrl = environment.apiUrl;
  httpClient = inject(HttpClient);

  createCompleteActivities(tema: string, nivel: string, quantidade: number) : Observable<CreateCompleteOpenAiDto> {
    return this.httpClient.get<CreateCompleteOpenAiDto>(`${this.apiUrl}/complete/create-by-openai`, {
      params: {
        theme: tema,
        level: nivel,
        quantity: quantidade
      }
    });
  }

}
