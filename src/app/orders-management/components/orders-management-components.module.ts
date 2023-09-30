import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { OrdersManagementPipesModule } from '../pipes/orders-management.pipes.module';
import { CustomerDatalistComponent } from './customer-datalist/customer-datalist.component';
import { EmployeeDatalistComponent } from './employee-datalist/employee-datalist.component';
import { ServiceOrderTypesDatalistComponent } from './service-order-types-datalist/service-order-types-datalist.component';
import { StatusDatalistComponent } from './status-datalist/status-datalist.component';
import { PriorityDatalistComponent } from './service-order-priority-datalist/priority-datalist.component';
import { SectorDatalistComponent } from './sector-datalist/sector-datalist.component';
import { ExecutionOrderHistoryDetailComponent } from './execution-order-history-detail/execution-order-history-detail.component';
import '@cds/core/icon/register.js';
import { ClarityIcons, imageIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';

const COMPONENTS = [
  EmployeeDatalistComponent,
  CustomerDatalistComponent,
  StatusDatalistComponent,
  ServiceOrderTypesDatalistComponent,
  PriorityDatalistComponent,
  SectorDatalistComponent,
  ExecutionOrderHistoryDetailComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, ClarityModule, SharedComponentsModule, OrdersManagementPipesModule],
})
export class OrdersManagementComponentsModule {
  constructor() {
    ClarityIcons.addIcons(imageIcon);
  }
}
