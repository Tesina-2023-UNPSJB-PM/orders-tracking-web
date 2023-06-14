import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ORDERS_MANAGEMENT_ROUTES } from './constants/routes.constant';
import { OrdersDetailComponent } from './pages/orders-detail/orders-detail.component';
import { OrdersListComponent } from './pages/orders-list/orders-list.component';
import { OrdersCreationComponent } from './pages/orders-creation/orders-creation.component';

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
  {
    path: ORDERS_MANAGEMENT_ROUTES.ORDERS_DETAIL,
    component: OrdersDetailComponent,
  },
  {
    path: ORDERS_MANAGEMENT_ROUTES.ORDERS_CREATION,
    component: OrdersCreationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersManagementRoutingModule {}
