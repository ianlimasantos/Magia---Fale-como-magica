import { HttpClient } from '@angular/common/http';
import { ApiService } from './api-service';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CuriosidadeService {

  private readonly _apiService = inject(ApiService);
  private readonly _httpClient = inject(HttpClient);

  findCuriositys(): Observable<any>{
    this._httpClient.get(this._apiService.apiUrl + )
  }

}
