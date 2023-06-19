import { MasterDataCustomerDTO } from "./master-data/master-data-customer.dto";
import { ServiceOrderStateDTO } from "./service-order-state.dto";
import { ServiceOrderTypeDTO } from "./service-order-type.dto";
import { Destination } from "./service-order.dto";


export class ServiceOrderDetailResponse {
  
  id?: number;
  
  number?: string;
  
  description?: string;
  
  type?: ServiceOrderTypeDTO;
  
  status?: ServiceOrderStateDTO;
  
  priority?: string;
  
  execution?: any;
  
  customer?: MasterDataCustomerDTO;
  
  destination?: Destination;
  
  creationTime?: Date;
  
  detail?: any;
}