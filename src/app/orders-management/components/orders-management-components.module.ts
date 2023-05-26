import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { OrdersManagementPipesModule } from '../pipes/orders-management.pipes.module';
import { CustomerDatalistComponent } from './customer-datalist/customer-datalist.component';
import { EmployeeDatalistComponent } from './employee-datalist/employee-datalist.component';
import { ServiceOrderTypesDatalistComponent } from './service-order-types-datalist/service-order-types-datalist.component';
import { StatusDatalistComponent } from './status-datalist/status-datalist.component';

const COMPONENTS = [
  EmployeeDatalistComponent,
  CustomerDatalistComponent,
  StatusDatalistComponent,
  ServiceOrderTypesDatalistComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, SharedComponentsModule, OrdersManagementPipesModule],
})
export class OrdersManagementComponentsModule {}
