import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { UserModel } from '../models/user/user-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  userInfo(): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.apiUrl}/user/me`);
  }
}
