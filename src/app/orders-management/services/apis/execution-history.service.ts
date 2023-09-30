import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExecutionHistoryResponseDto } from 'src/app/dtos/executionHistoryResponse.dto';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateExecutionHistory } from 'src/app/dtos/createExecutionHistory.dto';

@Injectable({
  providedIn: 'root'
})
export class ExecutionHistoryService {

  urlEndpoint = environment.endpoints.executionHistory;

  constructor(private readonly _httpClient: HttpClient) { }

  public getHistoryByExecutionId(executionId: number): Observable<ExecutionHistoryResponseDto[]> {
    const params = new HttpParams().append('executionId', executionId);
    return this._httpClient.get<ExecutionHistoryResponseDto[]>(this.urlEndpoint, { params });
  }

  public createHistoryExecution(request: CreateExecutionHistory): Observable<number> {
    return this._httpClient.post<number>(this.urlEndpoint, request);
  }
}
