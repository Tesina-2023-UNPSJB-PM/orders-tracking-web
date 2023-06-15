import { MasterDataCustomerDTO } from './master-data-customer.dto';
import { MasterDataEmployeeDTO } from './master-data-employee.dto';
import { MasterDataOrderStatusDTO } from './master-data-order-status.dto';
import { MasterDataOrderTypeDTO } from './master-data-order-type.dto';

export interface MasterDataDTO {
  employees?: MasterDataEmployeeDTO[];
  customers?: MasterDataCustomerDTO[];
  serviceOrderTypes?: MasterDataOrderTypeDTO[];
  serviceOrderStates?: MasterDataOrderStatusDTO[];
}
