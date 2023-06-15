import { MasterDataCustomerDTO } from '../dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from '../dtos/master-data/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from '../dtos/master-data/master-data-order-status.dto';
import { MasterDataOrderTypeDTO } from '../dtos/master-data/master-data-order-type.dto';

export interface AppState {
  readonly serviceOrderStates: MasterDataOrderStatusDTO[];
  readonly serviceOrderTypes: MasterDataOrderTypeDTO[];
  readonly customers: MasterDataCustomerDTO[];
  readonly employees: MasterDataEmployeeDTO[];
}
