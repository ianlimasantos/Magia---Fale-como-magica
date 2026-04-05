import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuriosidadesService {

  readonly apiUrl: string = environment.apiUrl;
  
}
