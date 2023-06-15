import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { EmployeeAction, EmployeeActionType } from '../actions/employee.action';

const initialState: MasterDataEmployeeDTO[] = [];


export function EmployeeReducer(
  state: MasterDataEmployeeDTO[] = initialState,
  action: EmployeeAction
) {
  switch (action.type) {
    case EmployeeActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}