import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MasterDataDTO } from 'src/app/dtos/master-data/master-data.dto';
import { CommonApi } from 'src/app/interfaces/common-api.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterDataApiService implements CommonApi<MasterDataDTO> {

    constructor(private readonly _httpClient: HttpClient) {}

    public get(): Observable<MasterDataDTO> {
        const { masterData } = environment.endpoints;
        return this._httpClient.get<MasterDataDTO>(masterData);
    }
}
