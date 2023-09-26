import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExecutionHistoryResponseDto } from 'src/app/dtos/executionHistoryResponse.dto';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExecutionHistoryService {

  constructor(private readonly _httpClient: HttpClient) { }

  public getHistoryByExecutionId(executionId: number): Observable<ExecutionHistoryResponseDto[]> {
    const urlEndpoint = environment.endpoints.executionHistory;
    const params = new HttpParams().append('executionId', executionId);
    return this._httpClient.get<ExecutionHistoryResponseDto[]>(urlEndpoint, { params });
  }
}
