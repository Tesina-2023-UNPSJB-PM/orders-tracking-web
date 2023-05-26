import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeDTO } from 'src/app/dtos/employee.dto';
import { CommonApi } from 'src/app/interfaces/common-api.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService implements CommonApi<EmployeeDTO> {
  constructor(private readonly _httpClient: HttpClient) {}

  public get(): Observable<EmployeeDTO[]> {
    const { employees } = environment.endpoints;
    return this._httpClient.get<EmployeeDTO[]>(employees);
  }
}
