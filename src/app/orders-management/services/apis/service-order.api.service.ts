import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceOrderItem } from 'src/app/dtos/service-order-item.dto';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { ServiceOrderTypeDTO } from 'src/app/dtos/service-order-type.dto';
import { CommonApi } from 'src/app/interfaces/common-api.interface';
import { environment } from 'src/environments/environment';
import { GetAllServiceOrderQueryParams } from './query-params/service-order.query-params';
import { ServiceOrderDetailResponse } from 'src/app/dtos/service-order-detail.dto';
import { ServiceOrderUpdateRequestDTO } from 'src/app/dtos/service-order-update.dto';
@Injectable({
  providedIn: 'root',
})
export class ServiceOrderApiService implements CommonApi<ServiceOrderItem> {
  constructor(private readonly _httpClient: HttpClient) {}

  public getAll(
    serviceOrderFilters: GetAllServiceOrderQueryParams = {}
  ): Observable<ServiceOrderItem[]> {
    const { serviceOrders } = environment.endpoints;
    const fromObject: any = serviceOrderFilters;

    Object.keys(serviceOrderFilters).forEach(
      (key) => fromObject[key] === undefined && delete fromObject[key]
    );

    const params = new HttpParams({
      fromObject,
    });

    return this._httpClient.get<ServiceOrderItem[]>(serviceOrders, { params });
  }

  public getServiceOrderStates(): Observable<ServiceOrderStateDTO[]> {
    const { serviceOrders } = environment.endpoints;
    return this._httpClient.get<ServiceOrderStateDTO[]>(
      `${serviceOrders}/states`
    );
  }

  public getServiceOrderTypes(): Observable<ServiceOrderTypeDTO[]> {
    const { serviceOrders } = environment.endpoints;
    return this._httpClient.get<ServiceOrderTypeDTO[]>(
      `${serviceOrders}/types`
    );
  }

  public getById(id: number): Observable<ServiceOrderDetailResponse> {
    const { serviceOrders } = environment.endpoints;
    return this._httpClient.get<ServiceOrderDetailResponse>(
      `${serviceOrders}/${id}`
    );
  }

  public updateById(body: ServiceOrderUpdateRequestDTO) {
    const { serviceOrders } = environment.endpoints;
    return this._httpClient.patch<ServiceOrderDetailResponse>(
      `${serviceOrders}`,
      body
    );
  }
}
