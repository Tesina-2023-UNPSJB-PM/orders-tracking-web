import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { EmployeeDTO } from 'src/app/dtos/employee.dto';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';

export interface ServiceOrderFilters {
  employee?: EmployeeDTO;
  customer?: CustomerDTO;
  state?: ServiceOrderStateDTO;
  creationDate?: Date;
}
