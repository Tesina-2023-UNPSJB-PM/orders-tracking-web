import { MasterDataOrderTypeDTO } from 'src/app/dtos/master-data/master-data-order-type.dto';
import { ServiceOrderTypeActions, ServiceOrderTypeActionType } from '../actions/service-order-type.action';

const initialState: MasterDataOrderTypeDTO[] = [];

export function ServiceOrderTypeReducer(
  state: MasterDataOrderTypeDTO[] = initialState,
  action: ServiceOrderTypeActions
) {
  switch (action.type) {
    case ServiceOrderTypeActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
