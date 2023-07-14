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
  
  destination?: OrderLocationDTO;
  
  creationTime?: Date;
  
  detail?: any;
}

interface OrderLocationDTO {
  id?: number;
  address?: AddressDTO;   
  referenceInfo?: string;
}

interface AddressDTO {
  id?: number;
  description: string;
  city: string;
  zipCode?: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

interface OrderExecutionDTO {
  id?: number;
  observations?: string;
  executorEmployeId?: number;
  assignedSectorId?: number;
  assignedTime?: Date;
  estimatedResolutionTime?: Date;
  resolutionTime?: Date;
}