import { Component } from '@angular/core';
import { MAIN_ROUTES } from 'src/app/constants/routes.constant';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
})
export class SideNavComponent {
  public get employeesTrackingRoute(): string {
    return MAIN_ROUTES.ORDERS_TRACKING;
  }
}
