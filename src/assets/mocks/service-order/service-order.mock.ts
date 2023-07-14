import { ServiceOrderDetailResponse } from "src/app/dtos/service-order-detail.dto";

export const SERVICE_ORDER_DETAIL: ServiceOrderDetailResponse[] = [
  {
    id: 3,
    number: '0002',
    description: 'Orden de servicio de ejemplo 2. Se modifica la descripción.',
    creationTime: new Date('2023-05-03T22:13:57.697Z'),
    priority: 'MEDIUM',
    status: {
      code: 'CANCELED',
      name: 'Cancelada',
      description: 'La orden de servicio fue cancelada.',
    },
    type: {
      id: 3,
      name: 'Reclamo',
      description: 'Reclamo de un usuario',
    },
    customer: {
      id: 25,
      firstName: 'José Luis',
      lastName: 'Devia',
    },
    destination: {
      address: {
        id: 2,
        description: 'dolore incididunt dolor cillum',
        city: 'Lorem pariatur',
        country: 'fugiat commodo',
        state: 'in officia culpa sed',
        zipCode: 'in',
        latitude: -41.605791,
        longitude: -65.363961,
      },
      referenceInfo: 'Porton marron',
    },
    execution: {
      executorEmployee: {
        firstName: 'Mario Alberto',
        lastName: 'Paz',
        recordNumber: '4512666',
        id: 4,
      },
      assignedSector: {
        name: 'Mantenimiento Red Agua/Cloacas',
        description: 'Sector encargado del mantenimiento',
        id: 2,
      },
      observations: 'Orden de ejecución de prueba 2',
      assignedTime: '2023-06-03T21:53:53.680Z',
      estimatedResolutionTime: '2023-06-05T12:00:00.000Z',
      resolutionTime: null,
      id: 4,
    },
    detail: null,
  },
];
