import { EmployeeDTO } from 'src/app/dtos/employee.dto';
import { EmployeeAction, EmployeeActionType } from '../actions/employee.action';

const initialState: EmployeeDTO[] = [];


export function EmployeeReducer(
  state: EmployeeDTO[] = initialState,
  action: EmployeeAction
) {
  switch (action.type) {
    case EmployeeActionType.LOAD_ITEMS:
      return [...state, ...action.payload];
    default:
      return state;
  }
}