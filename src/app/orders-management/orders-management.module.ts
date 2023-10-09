import { AsyncPipe, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ClarityModule,
  ClrDatagridModule,
  ClrFormsModule,
  ClrInputModule,
  ClrTextareaModule,
} from '@clr/angular';
import { SharedComponentsModule } from '../shared/components/shared.components.module';
import { OrdersManagementComponentsModule } from './components/orders-management-components.module';
import { OrdersManagementRoutingModule } from './orders-management-routing.module';
import { OrdersDetailComponent } from './pages/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrdersManagementPipesModule } from './pipes/orders-management.pipes.module';
import { OrdersCreationComponent } from './pages/orders-creation/orders-creation.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ClarityIcons, checkCircleIcon, checkIcon, clockIcon, powerIcon, timesIcon } from '@cds/core/icon';

@NgModule({
  declarations: [
    OrdersListComponent,
    OrdersDetailComponent,
    OrdersCreationComponent,
  ],
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
    OrdersManagementPipesModule,
    GoogleMapsModule,

  ],
  providers: [AsyncPipe],
})
export class OrdersManagementModule {
  constructor() {
    ClarityIcons.addIcons(checkIcon, clockIcon, timesIcon);
  }
}
