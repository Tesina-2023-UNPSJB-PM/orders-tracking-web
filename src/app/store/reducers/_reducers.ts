import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state.model';
import { ServiceOrderStateReducer } from './service-order-state.reducer';
import { ServiceOrderTypeReducer } from './service-order-type.reducer';
import { CustomerReducer } from './customer.reducer';
import { EmployeeReducer } from './employee.reducer';
import { ServiceOrderPriorityReducer } from './service-order-priority.reducer';

export const reducers: ActionReducerMap<AppState, any> = {
  serviceOrderStates: ServiceOrderStateReducer,
  serviceOrderTypes: ServiceOrderTypeReducer,
  serviceOrderPriorities: ServiceOrderPriorityReducer,
  customers: CustomerReducer,
  employees: EmployeeReducer,
};
