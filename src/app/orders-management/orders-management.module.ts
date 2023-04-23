import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrDatagridModule } from '@clr/angular';
import { SharedComponentsModule } from '../shared/components/shared.components.module';
import { OrdersManagementComponentsModule } from './components/orders-management-components.module';
import { OrdersManagementRoutingModule } from './orders-management-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';

@NgModule({
  declarations: [OrdersListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersManagementRoutingModule,
    ClarityModule,
    ClrDatagridModule,
    OrdersManagementComponentsModule,
    SharedComponentsModule,
  ],
})
export class OrdersManagementModule {}
