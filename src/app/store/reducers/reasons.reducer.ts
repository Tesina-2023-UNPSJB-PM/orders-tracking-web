import { MasterDataReasonStatusDTO } from "src/app/dtos/master-data/master-data-reason-status.dto";
import { ReasonsStatusActionType, ReasonsStatusActions } from "../actions/reason.action";

const initialState: MasterDataReasonStatusDTO[] = [];

export function ReasonStatusReducer(
  state: MasterDataReasonStatusDTO[] = initialState,
  action: ReasonsStatusActions
) {
  switch (action.type) {
    case ReasonsStatusActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}
