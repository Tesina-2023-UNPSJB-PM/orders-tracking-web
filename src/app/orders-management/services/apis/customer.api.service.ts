import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { CommonApi } from 'src/app/interfaces/common-api.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService implements CommonApi<CustomerDTO> {
  constructor(private readonly _httpClient: HttpClient) {}

  public get(): Observable<CustomerDTO[]> {
    const { customers } = environment.endpoints;
    return this._httpClient.get<CustomerDTO[]>(customers);
  }
}
