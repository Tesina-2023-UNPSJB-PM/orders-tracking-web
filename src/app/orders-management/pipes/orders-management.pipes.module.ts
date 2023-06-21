import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceOrderStateToDataListItemPipe } from './datalistitems/service-order-state-to-data-list-item.pipe';
import { ServiceOrderTypeToDataListItemPipe } from './datalistitems/service-order-type-to-data-list-item.pipe';
import { CustomerToDataListItemPipe } from './datalistitems/customer-to-data-list-item.pipe';
import { EmployeeToDataListItemPipe } from './datalistitems/employee-to-data-list-item.pipe';
import { ServiceOrderDetailToUpdateDtoPipe } from './dtos/service-order-detail-to-update-dto.pipe';

const PIPES = [
  ServiceOrderStateToDataListItemPipe,
  ServiceOrderTypeToDataListItemPipe,
  CustomerToDataListItemPipe,
  EmployeeToDataListItemPipe,
  ServiceOrderDetailToUpdateDtoPipe,
];

@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
  imports: [CommonModule],
  providers: [...PIPES]
})
export class OrdersManagementPipesModule {}
