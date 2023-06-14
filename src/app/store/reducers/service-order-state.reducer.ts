
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import {
  ServiceOrderStateAction,
  ServiceOrderStateActionType,
} from '../actions/service-order-state.action';

const initialState: MasterDataOrderStatusDTO[] = [];


export function ServiceOrderStateReducer(
  state: MasterDataOrderStatusDTO[] = initialState,
  action: ServiceOrderStateAction
) {
  switch (action.type) {
    case ServiceOrderStateActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
