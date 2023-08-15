import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ServiceOrderItem } from 'src/app/dtos/service-order-item.dto';
import { ASSIGNED_SERVICE_ORDERS } from '../constants/employee-orders.constants';

@Injectable({
  providedIn: 'root',
})
export class EmployeeOrdersService {
  constructor(private readonly httpClient: HttpClient) {}

  public getAssignedOrders(employeeId: number): Observable<ServiceOrderItem[]> {
    /** @todo add endpoint invocation */
    return of(ASSIGNED_SERVICE_ORDERS);
  }
}
