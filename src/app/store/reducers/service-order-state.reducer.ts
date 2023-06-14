import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import {
    ServiceOrderStateAction,
    ServiceOrderStateActionType,
} from '../actions/service-order-state.action';

const initialState: ServiceOrderStateDTO[] = [];


export function ServiceOrderStateReducer(
  state: ServiceOrderStateDTO[] = initialState,
  action: ServiceOrderStateAction
) {
  switch (action.type) {
    case ServiceOrderStateActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
