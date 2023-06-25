import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GoogleMapsModule } from '@angular/google-maps';
import {
  ClarityModule,
  ClrCheckboxModule,
  ClrInputModule
} from '@clr/angular';
import { OrdersTrackingRoutingModule } from './orders-tracking-routing.module';
import { GeneralMapPage } from './pages/general-map/general-map.page';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GeneralMapPage],
  imports: [
    CommonModule,
    OrdersTrackingRoutingModule,
    GoogleMapsModule,
    ClarityModule,
    ClrInputModule,
    ClrCheckboxModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class OrdersTrackingModule {}
