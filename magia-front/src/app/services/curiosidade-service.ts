import { HttpClient } from '@angular/common/http';
import { ApiService } from './api-service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuriosityCardModel } from '../models/curiosidade/curiosity-card-model';
import { CuriosityModel } from '../models/curiosidade/curiosity-model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuriosidadeService {

  private apiUrl = environment.apiUrl;
  private readonly httpClient = inject(HttpClient);

  createCuriosity(country: string, theme: string): Observable<any> {
    return this.httpClient.get<string>(this.apiUrl + `/curiosity/createCuriosity/${country}/${theme}`);
  }

  findCuriosity(id: string): Observable<CuriosityModel>{
    return this.httpClient.get<CuriosityModel>(this.apiUrl + `/curiosity/${id}`);
  }

  // createFlashcards(tema: string, nivel: string, quantidade: number) : Observable<CreateFlashcardOpenAiModel> {
  //     return this.httpClient.get<CreateFlashcardOpenAiModel>(`${this.apiUrl}/flashcard/create-by-openai`, {
  //       params: {
  //         theme: tema
  //       }
  //     }
}

