import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { CreateMultiplaEscolhaOpenAiModel } from '../models/multiplaEscolha/create-multiple-choice-openAi';

@Injectable({
  providedIn: 'root',
})
export class MultipleChoiceService {

  apiUrl = environment.apiUrl;
  httpClient = inject(HttpClient);

  createMultipleChoice(tema: string, nivel: string, quantidade: number) : Observable<CreateMultiplaEscolhaOpenAiModel> {
    return this.httpClient.get<CreateMultiplaEscolhaOpenAiModel>(`${this.apiUrl}/multiple-choice/create-by-openai`, {
      params: {
        theme: tema,
        level: nivel,
        quantity: quantidade
      }
    });
  }
}
