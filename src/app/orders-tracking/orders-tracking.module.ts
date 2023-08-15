import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GoogleMapsModule } from '@angular/google-maps';
import { ClarityModule, ClrCheckboxModule, ClrInputModule } from '@clr/angular';
import { OrdersTrackingRoutingModule } from './orders-tracking-routing.module';
import { GeneralMapPage } from './pages/general-map/general-map.page';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdersTrackingService } from './services/orders-tracking.service';
import { OrdersTrackingPubnubService } from './services/implementations/orders-tracking-pubnub.service';
import { EmployeeMarkerPipe } from './pipes/employee-marker.pipe';
import { OrdersManagementComponentsModule } from '../orders-management/components/orders-management-components.module';
import { OrderMarkerPipe } from './pipes/order-marker.pipe';

@NgModule({
  declarations: [GeneralMapPage, EmployeeMarkerPipe, OrderMarkerPipe],
  imports: [
    CommonModule,
    OrdersTrackingRoutingModule,
    GoogleMapsModule,
    ClarityModule,
    ClrInputModule,
    ClrCheckboxModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersManagementComponentsModule,
  ],
  providers: [
    { provide: OrdersTrackingService, useClass: OrdersTrackingPubnubService },
    EmployeeMarkerPipe,
    OrderMarkerPipe,
  ],
})
export class OrdersTrackingModule {}
