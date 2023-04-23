import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { ServiceOrderDTO } from 'src/app/dtos/service-order.dto';
import { CommonApi } from 'src/app/interfaces/common-api.interface';
import { environment } from 'src/environments/environment';
import { ServiceOrderFilters } from '../../interfaces/service-order-filters.interface';
@Injectable({
  providedIn: 'root',
})
export class ServiceOrderApiService implements CommonApi<ServiceOrderDTO> {
  constructor(private readonly _httpClient: HttpClient) {}

  public get(
    serviceOrderFilters?: ServiceOrderFilters
  ): Observable<ServiceOrderDTO[]> {
    const { serviceOrders } = environment.endpoints;
    /** @todo send filters to the backend */
    return this._httpClient.get<ServiceOrderDTO[]>(serviceOrders);
  }

  public getServiceOrderStates(): Observable<ServiceOrderStateDTO[]> {
    const { serviceOrders } = environment.endpoints;
    return this._httpClient.get<ServiceOrderStateDTO[]>(
      `${serviceOrders}/states`
    );
  }
}
