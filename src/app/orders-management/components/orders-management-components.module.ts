import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/components/shared.components.module';
import { CustomerFilterComponent } from './filters/customer-filter/customer-filter.component';
import { ReviewerFilterComponent } from './filters/reviewer-filter/reviewer-filter.component';
import { StatusFilterComponent } from './filters/status-filter/status-filter.component';

const COMPONENTS = [ReviewerFilterComponent, CustomerFilterComponent, StatusFilterComponent,]

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [CommonModule, SharedComponentsModule],
})
export class OrdersManagementComponentsModule {}
