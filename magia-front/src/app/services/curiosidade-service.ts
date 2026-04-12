import { HttpClient } from '@angular/common/http';
import { ApiService } from './api-service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuriosityCardModel } from '../models/curiosidade/curiosity-card-model';
import { CuriosityModel } from '../models/curiosidade/curiosity-model';

@Injectable({
  providedIn: 'root',
})
export class CuriosidadeService {

  private readonly _apiService = inject(ApiService);
  private readonly _httpClient = inject(HttpClient);

  findCuriositys(): Observable<CuriosityCardModel[]>{
    return this._httpClient.get<CuriosityCardModel[]>(this._apiService.apiUrl + '/curiosity/getCuriosityCards');
  }

  findCuriosity(id: string): Observable<CuriosityModel>{
    return this._httpClient.get<CuriosityModel>(this._apiService.apiUrl + `/curiosity/${id}`);
  }
}
