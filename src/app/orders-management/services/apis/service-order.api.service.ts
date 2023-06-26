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
import { CreateServiceOrderDTO } from 'src/app/dtos/service-order.dto';
@Injectable({
  providedIn: 'root',
})
export class ServiceOrderApiService implements CommonApi<ServiceOrderItem> {
  readonly uriServiceOrders;

  constructor(private readonly _httpClient: HttpClient) {
    this.uriServiceOrders = environment.endpoints.serviceOrders;
  }

  public getAll(
    serviceOrderFilters: GetAllServiceOrderQueryParams = {}
  ): Observable<ServiceOrderItem[]> {
    const fromObject: any = serviceOrderFilters;

    Object.keys(serviceOrderFilters).forEach(
      (key) => fromObject[key] === undefined && delete fromObject[key]
    );

    const params = new HttpParams({
      fromObject,
    });

    return this._httpClient.get<ServiceOrderItem[]>(this.uriServiceOrders, {
      params,
    });
  }

  public getServiceOrderStates(): Observable<ServiceOrderStateDTO[]> {
    return this._httpClient.get<ServiceOrderStateDTO[]>(
      `${this.uriServiceOrders}/states`
    );
  }

  public getServiceOrderTypes(): Observable<ServiceOrderTypeDTO[]> {
    return this._httpClient.get<ServiceOrderTypeDTO[]>(
      `${this.uriServiceOrders}/types`
    );
  }

  public getById(id: number): Observable<ServiceOrderDetailResponse> {
    return this._httpClient.get<ServiceOrderDetailResponse>(
      `${this.uriServiceOrders}/${id}`
    );
  }

  public delete(item: ServiceOrderItem): Observable<void> {
    return this._httpClient.delete<void>(`${this.uriServiceOrders}/${item.id}`);
  }

  public save(item: CreateServiceOrderDTO): Observable<number> {
    return this._httpClient.post<number>(this.uriServiceOrders, item);
  }
}
