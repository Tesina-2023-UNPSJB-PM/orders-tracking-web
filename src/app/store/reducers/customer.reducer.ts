import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { CustomerAction, CustomerActionType } from '../actions/customer.action';

const initialState: MasterDataCustomerDTO[] = [];


export function CustomerReducer(
  state: MasterDataCustomerDTO[] = initialState,
  action: CustomerAction
) {
  switch (action.type) {
    case CustomerActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}