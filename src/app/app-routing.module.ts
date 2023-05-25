import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAIN_ROUTES } from './constants/routes.constant';

const routes: Routes = [
  { path: '', redirectTo: MAIN_ROUTES.ORDERS_MANAGEMENT, pathMatch: 'full' },
  {
    path: MAIN_ROUTES.ORDERS_MANAGEMENT,
    loadChildren: () =>
      import('./orders-management/orders-management.module').then(
        (m) => m.OrdersManagementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
