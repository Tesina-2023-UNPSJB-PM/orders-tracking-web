import { ServiceOrderStateDTO } from "./service-order-state.dto";

export interface Type {
  id: number;
  name: string;
  description: string;
}

export interface AssignedUser {
  userId: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  lastLogin: Date;
  status: string;
}

export interface AddressDTO {
  id?: number;
  description: string;
  city: string;
  zipCode?: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Destination {
  addresses: AddressDTO;
  coordinate: Coordinate;
  referenceInfo: string;
}

export interface Customer {
  id: number;
  customerNumber: string;
  documentNumer: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ServiceDetail {
  title: string;
  description: string;
}

export interface ServiceOrderDTO {
  id: number;
  number: string;
  description: string;
  observations: string;
  type: Type;
  status: ServiceOrderStateDTO;
  priority: string;
  assignedUser: AssignedUser;
  destination: Destination;
  creationTime: Date;
  assignedTime?: any;
  estimatedResolutionTime: Date;
  resolutionTime?: any;
  customer: Customer;
  serviceDetail: ServiceDetail;
}

export interface OrderExecutionDTO {
  id?: number;
  observations?: string;
  executorEmployeId?: number;
  assignedSectorId?: number;
  assignedTime?: Date;
  estimatedResolutionTime?: Date;
  resolutionTime?: Date;
}

export interface OrderLocationDTO {
  id?: number;
  address: AddressDTO | undefined | null;
  referenceInfo?: string;
}

export interface CreateServiceOrderDTO {
  number?: string;
  description?: string;
  typeId?: number;
  status?: string;
  priority?: string;
  execution?: OrderExecutionDTO;
  customerId?: number;
  destination?: OrderLocationDTO;
  creationTime?: Date;
  detail?: object;
}

export const SERVICE_ORDER_STATUS = {
  DONE: {
    code: 'DONE',
    statusDescription: 'Finalizado',
    statusColor: '#A6A033',
    statusIcon: 'check-circle-o',
  },
  CANCELED: {
    code: 'CANCELED',
    statusDescription: 'Cancelado',
    statusColor: '#DB4834',
    statusIcon: 'times-circle-o',
  },
  PENDING: {
    code: 'PENDING',
    statusDescription: 'Pendiente',
    statusColor: '#e7cf3d',
    statusIcon: 'clock-o',
  },
};

export const SERVICE_ORDER_STATUS_CODES = Object.keys(SERVICE_ORDER_STATUS);

export const SERVICE_ORDER_DESCRIPTION = {
  DONE: 'Finalizado',
  CANCELED: 'Cancelado',
  PENDING: 'Pendiente',
};
