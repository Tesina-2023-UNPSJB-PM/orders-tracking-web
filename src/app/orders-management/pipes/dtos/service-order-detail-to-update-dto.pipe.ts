import { Pipe, PipeTransform } from '@angular/core';
import { ServiceOrderDetailResponse } from 'src/app/dtos/service-order-detail.dto';
import { ServiceOrderUpdateRequestDTO } from 'src/app/dtos/service-order-update.dto';

@Pipe({
  name: 'serviceOrderDetailToUpdateDto',
})
export class ServiceOrderDetailToUpdateDtoPipe implements PipeTransform {
  transform(
    serviceOrderDetail: ServiceOrderDetailResponse,
    ...args: unknown[]
  ): ServiceOrderUpdateRequestDTO {
    const {
      id = 0,
      execution: _execution,
      status,
      description,
      customer,
      type,
    } = serviceOrderDetail;
    

    const execution: ServiceOrderUpdateRequestDTO =
      this.getExecution(_execution);

    const { customer: _customer, ...rest } = serviceOrderDetail;

    const updateBody: ServiceOrderUpdateRequestDTO = {
      ...rest,
      status: status?.code,
      description: description ?? undefined,
      customerId: customer?.id,
      execution: execution ?? undefined,
      typeId: type?.id,
    };
    return updateBody;
  }

  private getExecution(
    serviceOrderDetailExecution: any
  ): ServiceOrderUpdateRequestDTO {
    const {
      assignedSector: _assignedSector,
      executorEmployee: _executorEmployee,
      ..._execution
    } = serviceOrderDetailExecution;

    return {
      ..._execution,
      executorEmployeId: _executorEmployee.id,
      assignedSectorId: _assignedSector.id,
    }
  }
}
