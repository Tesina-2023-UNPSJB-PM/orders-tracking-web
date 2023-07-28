import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SignInRequest, SignInResponse } from 'src/app/dtos/signIn.dto';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  constructor(private _httpClient: HttpClient) { }

  signIn(request: SignInRequest): Observable<SignInResponse> {
    return this._httpClient.post<SignInResponse>( environment.endpoints.login , request);
  }
}
