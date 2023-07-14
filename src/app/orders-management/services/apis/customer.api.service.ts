import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { CommonApi } from 'src/app/interfaces/common-api.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService implements CommonApi<MasterDataCustomerDTO> {
  urlApiCustomers: string = '';

  constructor(private readonly _httpClient: HttpClient) {
    this.urlApiCustomers = environment.endpoints.customers;
  }

  public getAll(): Observable<MasterDataCustomerDTO[]> {
    return this._httpClient.get<MasterDataCustomerDTO[]>(this.urlApiCustomers);
  }

  public getById(id: number): Observable<CustomerDTO> {
      return this._httpClient.get<CustomerDTO>(`${this.urlApiCustomers}/${id}`);
  }
}
