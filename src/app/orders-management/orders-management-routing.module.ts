import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ORDERS_MANAGEMENT_ROUTES } from './constants/routes.constant';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: ORDERS_MANAGEMENT_ROUTES.ORDERS_LIST,
    pathMatch: 'full',
  },
  {
    path: ORDERS_MANAGEMENT_ROUTES.ORDERS_LIST,
    component: OrdersListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersManagementRoutingModule {}
