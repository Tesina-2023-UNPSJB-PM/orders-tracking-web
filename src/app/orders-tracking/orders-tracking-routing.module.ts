import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ORDERS_TRACKING_ROUTES } from './constants/routes.constants';
import { GeneralMapPage } from './pages/general-map/general-map.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: ORDERS_TRACKING_ROUTES.GENERAL_MAP,
    pathMatch: 'full',
  },
  { path: ORDERS_TRACKING_ROUTES.GENERAL_MAP, component: GeneralMapPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersTrackingRoutingModule {}
