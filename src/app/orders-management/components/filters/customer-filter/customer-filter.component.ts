import { Component, OnInit, forwardRef } from '@angular/core'
import { NG_VALUE_ACCESSOR } from '@angular/forms'
import { ReplaySubject, map, takeUntil, tap } from 'rxjs'
import { CustomerDTO } from 'src/app/dtos/customer.dto'
import { CustomerApiService } from 'src/app/orders-management/services/apis/customer.api.service'
import { DatalistComponent } from 'src/app/shared/components/datalist/datalist.component'
import { DatalistItem } from 'src/app/shared/components/datalist/datalist.interfaces'

@Component({
  selector: 'app-customer-filter',
  template: '<shd-datalist [label]="label" [placeholder]="placeholder" [items]="datalistItems" (inputValueChange)="onInputValueChanges($event)"/>',
  styleUrls: ['./customer-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerFilterComponent),
      multi: true,
    },
  ],
})
export class CustomerFilterComponent extends DatalistComponent<CustomerDTO>
  implements OnInit {
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject()
  private _customers: CustomerDTO[] = []
  protected datalistItems: DatalistItem[] = []

  constructor(private readonly _customerApiSrv: CustomerApiService) {
    super()
  }

  ngOnInit(): void {
    this._customerApiSrv
      .get()
      .pipe(
        takeUntil(this._destroy), 
        tap((customers: CustomerDTO[]) => (this._customers = customers)),
        map((customers: CustomerDTO[]) => customers.map((customer: CustomerDTO) => ({
          id: `${customer.id}`,
          value: `${customer.firstName} ${customer.lastName}`,
        } as DatalistItem)))
      )
      .subscribe({
        next: (datalistItems: DatalistItem[]) => (this.datalistItems = datalistItems),
        error: (error) => console.error(error),
      })
  }

  protected override getEntityValue(dataListItem: DatalistItem): CustomerDTO | undefined {
    return this._customers.find((customer: CustomerDTO) => customer.id == +dataListItem.id)
  }
}
