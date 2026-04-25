import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CreateAccountModel } from '../models/account/create-account-model';
import { Observable } from 'rxjs';
import { GetAccountModel } from '../models/account/get-account-model';

@Injectable({
  providedIn: 'root',
})
export class CreateAccountService {

  private readonly httpClient = inject(HttpClient);

  createAccount(createAccountModel: CreateAccountModel): Observable<GetAccountModel>{
    return this.httpClient.post<GetAccountModel>(`${environment.apiUrl}/user/saveUser`, createAccountModel)
  }
}
