import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { FlashcardModel } from '../models/flashcard/flashcard-model';
import { Observable } from 'rxjs';
import { CreateFlashcardOpenAiModel } from '../models/flashcard/create-flashcard-openAi';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {

  apiUrl = environment.apiUrl;
  httpClient = inject(HttpClient);

  createFlashcards(tema: string, nivel: string, quantidade: number) : Observable<CreateFlashcardOpenAiModel> {
    return this.httpClient.get<CreateFlashcardOpenAiModel>(`${this.apiUrl}/flashcard/create-by-openai`, {
      params: {
        theme: tema,
        level: nivel,
        quantity: quantidade
      }
    });
  }

  getFlashcard(id: string) : Observable<FlashcardModel[]> {
    return this.httpClient.get<FlashcardModel[]>(`${this.apiUrl}/flashcard/${id}`);
  }
}
