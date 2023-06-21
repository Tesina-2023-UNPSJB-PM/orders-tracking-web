import { Destination } from "./service-order.dto";

export interface ServiceOrderUpdateRequestDTO {
    id?: number;
    number?: string;
    description?: string;
    typeId?: number;
    status?: string;
    priority?: string;
    execution?: OrderExecutionDTO;
    customerId?: number;
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