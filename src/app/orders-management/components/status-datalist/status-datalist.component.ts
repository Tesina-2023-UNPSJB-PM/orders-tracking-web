import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';
import { AppState } from 'src/app/store/state.model';

@Component({
  selector: 'app-status-datalist',
  template:
    `<shd-datalist [inputValue]="inputValue" [label]="label" [placeholder]="placeholder"
        [items]="serviceOrderStates | serviceOrderStateToDataListItem"
        (inputValueChange)="onInputValueChanges($event)"
        [disabled]="disabled"/>`,
  styleUrls: ['./status-datalist.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusDatalistComponent),
      multi: true,
    },
  ],
})
export class StatusDatalistComponent
  extends DatalistComponent<MasterDataOrderStatusDTO>
  implements OnInit
{
  protected serviceOrderStates: MasterDataOrderStatusDTO[] = [];
  protected serviceOrderState$: Observable<MasterDataOrderStatusDTO[]>;
  constructor(private readonly store: Store<AppState>) {
    super();
    this.serviceOrderState$ = this.store.select<MasterDataOrderStatusDTO[]>(
      ({ serviceOrderStates }) => serviceOrderStates
    );
  }

  ngOnInit() {
    this.serviceOrderState$
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        (serviceOrderStates) => (this.serviceOrderStates = serviceOrderStates)
      );
  }

  protected override getEntityValue(
    dataListItem: DatalistItem
  ): MasterDataOrderStatusDTO | undefined {
    return this.serviceOrderStates?.find(
      (state: MasterDataOrderStatusDTO) => state.code === dataListItem.id
    );
  }

  public override writeValue(state: MasterDataOrderStatusDTO): void {
    if (state) this.inputValue = state?.name ?? '';
  }
}
