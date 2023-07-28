import { MasterDataCustomerDTO } from '../dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from '../dtos/master-data/master-data-employee.dto';
import { MasterDataOrderPriorityDTO } from '../dtos/master-data/master-data-order-priority.dto';
import { MasterDataOrderStatusDTO } from '../dtos/master-data/master-data-order-status.dto';
import { MasterDataOrderTypeDTO } from '../dtos/master-data/master-data-order-type.dto';
import { SignInResponse } from '../dtos/signIn.dto';

export interface AppState {
  readonly serviceOrderStates: MasterDataOrderStatusDTO[];
  readonly serviceOrderTypes: MasterDataOrderTypeDTO[];
  readonly serviceOrderPriorities: MasterDataOrderPriorityDTO[];
  readonly customers: MasterDataCustomerDTO[];
  readonly employees: MasterDataEmployeeDTO[];
  /*readonly authenticatedUser: SignInResponse;*/
}
