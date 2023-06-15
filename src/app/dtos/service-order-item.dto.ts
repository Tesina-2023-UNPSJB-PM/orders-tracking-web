export interface ServiceOrderItem {
  id: number;
  number: string;
  description: string;
  creationTime: string;
  priority: string;
  status: Status;
  type: Type;
  customerId: number;
  destination: Destination;
  execution: Execution;
  detail?: any;
}

export interface Execution {
  executorEmployeId: number;
  assignedSectorId: number;
  observations: string;
  assignedTime: string;
  estimatedResolutionTime: string;
  resolutionTime?: any;
}

export interface Destination {
  address: Address;
  referenceInfo: string;
}

export interface Address {
  id: number;
  description: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
}

export interface Type {
  id: number;
  name: string;
  description: string;
}

export interface Status {
  id: number;
  name: string;
  description: string;
}
