import { Component } from '@angular/core';
import { MAIN_ROUTES } from 'src/app/constants/routes.constant';
import { ORDERS_MANAGEMENT_ROUTES } from 'src/app/orders-management/constants/routes.constant';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  public get employeesTrackingRoute(): string {
    return MAIN_ROUTES.ORDERS_TRACKING;
  }

  public get ordersListRoute(): string {
    return  `${MAIN_ROUTES.ORDERS_MANAGEMENT}/${ORDERS_MANAGEMENT_ROUTES.ORDERS_LIST}`;
  }

  public get orderCreateRoute(): string {
    return `${MAIN_ROUTES.ORDERS_MANAGEMENT}/${ORDERS_MANAGEMENT_ROUTES.ORDERS_CREATION}`;
  }
}
