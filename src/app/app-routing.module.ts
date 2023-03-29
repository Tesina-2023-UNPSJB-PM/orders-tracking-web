import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  { path: '', redirectTo: 'orders-management', pathMatch: 'full' },
  {
    path: 'orders-management',
    loadChildren: () =>
      import('./orders-management/orders-management.module').then(
        (m) => m.OrdersManagementModule,
      ),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
