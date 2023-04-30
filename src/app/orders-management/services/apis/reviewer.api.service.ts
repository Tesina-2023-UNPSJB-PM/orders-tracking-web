import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewerDTO } from 'src/app/dtos/reviewer.dto';
import { CommonApi } from 'src/app/interfaces/common-api.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewerApiService implements CommonApi<ReviewerDTO> {
  constructor(private readonly _httpClient: HttpClient) {}

  public get(): Observable<ReviewerDTO[]> {
    const { reviewers } = environment.endpoints;
    return this._httpClient.get<ReviewerDTO[]>(reviewers);
  }
}
