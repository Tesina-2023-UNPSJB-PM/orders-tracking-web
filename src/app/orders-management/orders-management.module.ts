import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersManagementRoutingModule } from './orders-management-routing.module';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { ClarityModule, ClrDatagridModule } from '@clr/angular';


@NgModule({
  declarations: [
    OrdersListComponent
  ],
  imports: [
    CommonModule,
    OrdersManagementRoutingModule,
    ClarityModule,
    ClrDatagridModule,
  ]
})
export class OrdersManagementModule { }
