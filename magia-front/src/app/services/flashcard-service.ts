import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { FlashcardModel } from '../models/flashcard/flashcard-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FlashcardService {

  apiUrl = environment.apiUrl;
  httpClient = inject(HttpClient);

  createFlashcards(tema: string, nivel: string, quantidade: number) : Observable<FlashcardModel[]> {
    return this.httpClient.get<FlashcardModel[]>(`${this.apiUrl}/flashcard/create-by-openai`, {
      params: {
        theme: tema,
        level: nivel,
        quantity: quantidade
      }
    });
  }
}
