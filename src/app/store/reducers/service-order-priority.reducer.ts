import { MasterDataOrderPriorityDTO } from "src/app/dtos/master-data/master-data-order-priority.dto";
import { ServiceOrderPriorityAction, ServiceOrderPriorityActionType } from "../actions/service-order-priority.action";

const initialState: MasterDataOrderPriorityDTO[] = [];


export function ServiceOrderPriorityReducer(
  state: MasterDataOrderPriorityDTO[] = initialState,
  action: ServiceOrderPriorityAction
) {
  switch (action.type) {
    case ServiceOrderPriorityActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
