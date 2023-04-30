import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule, ClrDatagridModule, ClrFormsModule, ClrInputModule, ClrTextareaModule } from '@clr/angular';
import { SharedComponentsModule } from '../shared/components/shared.components.module';
import { OrdersManagementComponentsModule } from './components/orders-management-components.module';
import { OrdersManagementRoutingModule } from './orders-management-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders-detail/orders-detail.component';

@NgModule({
  declarations: [OrdersListComponent, OrdersDetailComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrdersManagementRoutingModule,
    ClarityModule,
    ClrDatagridModule,
    ClrFormsModule,
    ClrInputModule,
    ClrTextareaModule,
    FormsModule,
    OrdersManagementComponentsModule,
    SharedComponentsModule,
  ],
})
export class OrdersManagementModule {}
