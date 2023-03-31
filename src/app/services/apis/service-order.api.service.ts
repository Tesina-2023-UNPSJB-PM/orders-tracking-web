import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto';
@Injectable({
  providedIn: 'root'
})
export class ServiceOrderApiService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { }

  public find() {
    const { serviceOrders } = environment.endpoints;
    return this._httpClient.get<ServiceOrderDTO[]>(serviceOrders)
  }
}
