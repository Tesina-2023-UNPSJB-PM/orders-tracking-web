import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
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
  extends DatalistComponent<MasterDataCustomerDTO>
  implements OnInit
{
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject();
  protected customers: MasterDataCustomerDTO[] = [];
  protected customer$: Observable<MasterDataCustomerDTO[]>;
  constructor(private readonly store: Store<AppState>) {
    super();
    this.customer$ = this.store.select<MasterDataCustomerDTO[]>(
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
  ): MasterDataCustomerDTO | undefined {
    return this.customers.find(
      (customer: MasterDataCustomerDTO) => customer.id == +dataListItem.id
    );
  }

  public override writeValue(customer: MasterDataCustomerDTO): void {
    if (customer)
      this.inputValue = `${customer?.firstName} ${customer?.lastName}` ?? '';
  }
}
