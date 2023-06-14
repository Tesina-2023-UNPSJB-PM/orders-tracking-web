import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';
import { AppState } from 'src/app/store/state.model';

@Component({
  selector: 'app-customer-datalist',
  template:
    '<shd-datalist [inputValue]="inputValue" [label]="label" [placeholder]="placeholder" [items]="customers | customerToDataListItem" (inputValueChange)="onInputValueChanges($event)"/>',
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
  protected customers: CustomerDTO[] = [];
  protected customer$: Observable<CustomerDTO[]>;
  constructor(private readonly store: Store<AppState>) {
    super();
    this.customer$ = this.store.select<CustomerDTO[]>(
      ({ customers }) => customers
    );
  }

  ngOnInit(): void {
    this.customer$
      .pipe(takeUntil(this.$destroy))
      .subscribe((customers) => (this.customers = customers));
  }

  protected override getEntityValue(
    dataListItem: DatalistItem
  ): CustomerDTO | undefined {
    return this.customers.find(
      (customer: CustomerDTO) => customer.id == +dataListItem.id
    );
  }

  public override writeValue(customer: CustomerDTO): void {
    if (customer)
      this.inputValue = `${customer?.firstName} ${customer?.lastName}` ?? '';
  }
}
