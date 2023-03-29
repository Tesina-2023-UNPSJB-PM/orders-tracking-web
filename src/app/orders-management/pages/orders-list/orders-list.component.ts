import { Component } from '@angular/core'

@Component({
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css'],
})
export class OrdersListComponent {
  users = [
    { id: 1, name: 'Fabian Ruiz', creation: new Date(), color: 'red' },
    { id: 1, name: 'Sergio Ochoa', creation: new Date(), color: 'green' },
  ]
}
