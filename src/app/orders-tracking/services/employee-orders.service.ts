import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SummaryOrdersDTO } from 'src/app/dtos/service-order-item.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeOrdersService {
  constructor(private readonly httpClient: HttpClient) {}

  public getAssignedOrders(employeeId: number): Observable<SummaryOrdersDTO> {
    const urlTarget = `${environment.endpoints.serviceOrders}/summary`;
    const params = new HttpParams().append('employeeId', employeeId);
    return this.httpClient.get<SummaryOrdersDTO>(urlTarget, { params });
  }
}
