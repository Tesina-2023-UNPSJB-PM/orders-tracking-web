import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FetchMasterDataAction } from '../store/actions/master-data.action';
import { AppState } from '../store/state.model';
@Injectable()
export class InitializeAppService {
  constructor(private store: Store<AppState>) {}

  public async initializeApp(): Promise<void> {
    this.store.dispatch(new FetchMasterDataAction());
  }
}
