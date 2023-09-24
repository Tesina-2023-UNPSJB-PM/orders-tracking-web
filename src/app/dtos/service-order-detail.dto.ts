import { MasterDataCustomerDTO } from "./master-data/master-data-customer.dto";
import { MasterDataEmployeeDTO } from "./master-data/master-data-employee.dto";
import { SectorDTO } from "./sector.dto";
import { ServiceOrderStateDTO } from "./service-order-state.dto";
import { ServiceOrderTypeDTO } from "./service-order-type.dto";


export class ServiceOrderDetailResponse {

  id?: number;

  number?: string;

  description?: string;

  creationTime?: Date;

  priority?: string;

  status?: ServiceOrderStateDTO;

  type?: ServiceOrderTypeDTO;

  customer?: MasterDataCustomerDTO;

  destination?: OrderLocationDTO;

  execution?: OrderExecutionDTO;

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
  executorEmployee?: MasterDataEmployeeDTO;
  assignedSector?: SectorDTO;
  assignedTime?: Date;
  estimatedResolutionTime?: Date;
  resolutionTime?: Date;
}
