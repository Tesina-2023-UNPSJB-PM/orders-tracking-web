import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceOrderStateToDataListItemPipe } from './datalistitems/service-order-state-to-data-list-item.pipe';
import { ServiceOrderTypeToDataListItemPipe } from './datalistitems/service-order-type-to-data-list-item.pipe';

const PIPES = [ServiceOrderStateToDataListItemPipe, ServiceOrderTypeToDataListItemPipe]


@NgModule({
  declarations: [...PIPES],
  exports: [...PIPES],
  imports: [
    CommonModule
  ]
})
export class OrdersManagementPipesModule { }
