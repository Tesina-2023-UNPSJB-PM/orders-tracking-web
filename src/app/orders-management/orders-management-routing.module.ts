import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { OrdersListComponent } from './pages/orders-list/orders-list.component'

const routes: Routes = [
  { path: '', redirectTo: 'orders-list', pathMatch: 'full' },
  { path: 'orders-list', component: OrdersListComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersManagementRoutingModule {}
