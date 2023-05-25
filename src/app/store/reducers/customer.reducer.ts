import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { CustomerAction, CustomerActionType } from '../actions/customer.action';

const initialState: CustomerDTO[] = [];


export function CustomerReducer(
  state: CustomerDTO[] = initialState,
  action: CustomerAction
) {
  switch (action.type) {
    case CustomerActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}