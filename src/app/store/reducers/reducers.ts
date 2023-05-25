import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state.model';
import { ServiceOrderStateReducer } from './service-order-state.reducer';
import { ServiceOrderTypeReducer } from './service-order-type.reducer';

export const reducers: ActionReducerMap<AppState, any> = {
  serviceOrderStates: ServiceOrderStateReducer,
  serviceOrderTypes: ServiceOrderTypeReducer,
};
