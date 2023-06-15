import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';

export interface ServiceOrderFilters {
  employee?: MasterDataEmployeeDTO;
  customer?: MasterDataCustomerDTO;
  state?: MasterDataOrderStatusDTO;
  creationDate?: Date;
}
