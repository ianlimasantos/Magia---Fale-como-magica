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

  findCuriosities(): Observable<CuriosityCardModel[]>{
    return this.httpClient.get<CuriosityCardModel[]>(this.apiUrl + '/curiosity/getCuriosityCards');
  }

  findCuriosity(id: string): Observable<CuriosityModel>{
    return this.httpClient.get<CuriosityModel>(this.apiUrl + `/curiosity/${id}`);
  }
}
