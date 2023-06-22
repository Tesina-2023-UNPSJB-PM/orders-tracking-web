import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrdersTrackingRoutingModule } from './orders-tracking-routing.module';
import { GeneralMapPage } from './pages/general-map/general-map.page';
import { GoogleMapsModule } from '@angular/google-maps'


@NgModule({
  declarations: [
    GeneralMapPage
  ],
  imports: [
    CommonModule,
    OrdersTrackingRoutingModule,
    GoogleMapsModule
  ]
})
export class OrdersTrackingModule { }
