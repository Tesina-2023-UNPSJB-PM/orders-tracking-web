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
  
  export interface Addresses {
    streetName: string;
    streetNumber: string;
    floor: string;
    departamentNumber: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
  }
  
  export interface Coordinate {
    latitude: number;
    longitude: number;
  }
  
  export interface Destination {
    addresses: Addresses;
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
    status: string;
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