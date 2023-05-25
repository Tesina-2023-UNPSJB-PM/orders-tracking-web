import { Injectable } from '@angular/core';
import { AppState } from '../store/state.model';
import { Store } from '@ngrx/store';
import { FetchServiceOrderTypeAction } from '../store/actions/service-order-type.action';
import { FetchServiceOrderStateAction } from '../store/actions/service-order-state.action';
@Injectable()
export class InitializeAppService {
  constructor(private store: Store<AppState>) {}

  public async initializeApp(): Promise<void> {
    this.store.dispatch(new FetchServiceOrderTypeAction());
    this.store.dispatch(new FetchServiceOrderStateAction());
  }
}
