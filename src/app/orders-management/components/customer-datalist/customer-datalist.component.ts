import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, map, takeUntil, tap } from 'rxjs';
import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { CustomerApiService } from 'src/app/orders-management/services/apis/customer.api.service';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Component({
  selector: 'app-customer-datalist',
  template:
    '<shd-datalist [inputValue]="inputValue" [label]="label" [placeholder]="placeholder" [items]="datalistItems" (inputValueChange)="onInputValueChanges($event)"/>',
  styleUrls: ['./customer-datalist.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerDatalistComponent),
      multi: true,
    },
  ],
})
export class CustomerDatalistComponent
  extends DatalistComponent<CustomerDTO>
  implements OnInit
{
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject();
  private _customers: CustomerDTO[] = [];
  protected datalistItems: DatalistItem[] = [];

  constructor(private readonly _customerApiSrv: CustomerApiService) {
    super();
  }

  ngOnInit(): void {
    this._customerApiSrv
      .get()
      .pipe(
        takeUntil(this._destroy),
        tap((customers: CustomerDTO[]) => (this._customers = customers)),
        map((customers: CustomerDTO[]) =>
          customers.map(
            (customer: CustomerDTO) =>
              ({
                id: `${customer.id}`,
                value: `${customer.firstName} ${customer.lastName}`,
              } as DatalistItem)
          )
        )
      )
      .subscribe({
        next: (datalistItems: DatalistItem[]) =>
          (this.datalistItems = datalistItems),
        error: (error) => console.error(error),
      });
  }

  protected override getEntityValue(
    dataListItem: DatalistItem
  ): CustomerDTO | undefined {
    return this._customers.find(
      (customer: CustomerDTO) => customer.id == +dataListItem.id
    );
  }

  public override writeValue(customer: CustomerDTO): void {
    if (customer)
      this.inputValue = `${customer?.firstName} ${customer?.lastName}` ?? '';
  }
}
