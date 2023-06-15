import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { CommonApi } from 'src/app/interfaces/common-api.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService implements CommonApi<MasterDataCustomerDTO> {
  constructor(private readonly _httpClient: HttpClient) {}

  public getAll(): Observable<MasterDataCustomerDTO[]> {
    const { customers } = environment.endpoints;
    return this._httpClient.get<MasterDataCustomerDTO[]>(customers);
  }
}
