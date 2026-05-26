import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  authenticate(email: string, password: string){
    return this.httpClient.post(`${this.apiUrl}/auth/login`, {email, password});
  }


}

