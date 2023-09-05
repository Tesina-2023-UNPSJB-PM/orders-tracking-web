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
import { CreateServiceOrderDTO, ServiceOrderDTO } from 'src/app/dtos/service-order.dto';
import { ServiceOrderUpdateRequestDTO } from 'src/app/dtos/service-order-update.dto';
import { PageDto } from 'src/app/shared/pagination/page.dto';
import { PageOptionsDto } from 'src/app/shared/pagination/page-options.dto';
@Injectable({
  providedIn: 'root',
})
export class ServiceOrderApiService implements CommonApi<ServiceOrderItem> {
  readonly uriServiceOrders;

  constructor(private readonly _httpClient: HttpClient) {
    this.uriServiceOrders = environment.endpoints.serviceOrders;
  }

  public getPage(
    pageOptionsDto: PageOptionsDto,
    serviceOrderFilters: GetAllServiceOrderQueryParams = {}
  ): Observable<PageDto<ServiceOrderItem>> {
    const fromObject: any = {...pageOptionsDto,...serviceOrderFilters};

    Object.keys(serviceOrderFilters).forEach(
      (key) => fromObject[key] === undefined && delete fromObject[key]
    );

    console.log("🚀 ~ file: service-order.api.service.ts:30 ~ ServiceOrderApiService ~ fromObject:", fromObject)


    const params = new HttpParams({
      fromObject,
    });

    return this._httpClient.get<PageDto<ServiceOrderItem>>(this.uriServiceOrders, {
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

  public updateById(body: ServiceOrderUpdateRequestDTO) {
    const { serviceOrders } = environment.endpoints;
    return this._httpClient.patch<ServiceOrderDetailResponse>(
      `${serviceOrders}`,
      body
    );
  }
  public delete(item: ServiceOrderItem): Observable<void> {
    return this._httpClient.delete<void>(`${this.uriServiceOrders}/${item.id}`);
  }

  public save(item: CreateServiceOrderDTO): Observable<number> {
    return this._httpClient.post<number>(this.uriServiceOrders, item);
  }
}
