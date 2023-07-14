import { SERVICE_ORDER_DETAIL } from 'src/assets/mocks/service-order/service-order.mock';
import { ServiceOrderDetailToUpdateDtoPipe } from './service-order-detail-to-update-dto.pipe';

describe('ServiceOrderDetailToUpdateDtoPipe', () => {
  it('create an instance', () => {
    const pipe = new ServiceOrderDetailToUpdateDtoPipe();
    expect(pipe).toBeTruthy();
  });

  it('should have the same values', () => {
    const serviceOrderDetail = SERVICE_ORDER_DETAIL[0];
    const pipe = new ServiceOrderDetailToUpdateDtoPipe();

    const { id, description, customerId, status, typeId, priority, number, execution } =
      pipe.transform(serviceOrderDetail);


    expect(id).toBe(serviceOrderDetail.id);

    expect(description).toBe(serviceOrderDetail.description);

    expect(priority).toBe(serviceOrderDetail.priority);

    expect(number).toBe(serviceOrderDetail.number);

    expect(customerId).toBe(serviceOrderDetail.customer?.id);

    expect(status).toBe(serviceOrderDetail.status?.code);

    expect(typeId).toBe(serviceOrderDetail.type?.id);

    expect(execution?.executorEmployeId).toBe(serviceOrderDetail.execution?.executorEmployee.id);

    expect(execution?.assignedSectorId).toBe(serviceOrderDetail.execution?.assignedSector.id);
  });
});
