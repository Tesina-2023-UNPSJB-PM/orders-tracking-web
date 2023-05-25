import { ServiceOrderTypeDTO } from 'src/app/dtos/service-order-type.dto';
import { ServiceOrderTypeActions, ServiceOrderTypeActionType } from '../actions/service-order-type.action';

const initialState: ServiceOrderTypeDTO[] = [];

export function ServiceOrderTypeReducer(
  state: ServiceOrderTypeDTO[] = initialState,
  action: ServiceOrderTypeActions
) {
  switch (action.type) {
    case ServiceOrderTypeActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
