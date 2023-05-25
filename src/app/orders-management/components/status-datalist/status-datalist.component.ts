import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';
import { AppState } from 'src/app/store/state.model';

@Component({
  selector: 'app-status-datalist',
  template:
    '<shd-datalist [inputValue]="inputValue" [label]="label" [placeholder]="placeholder" [items]="serviceOrderStates | serviceOrderStateToDataListItem" (inputValueChange)="onInputValueChanges($event)"/>',
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
  extends DatalistComponent<ServiceOrderStateDTO>
  implements OnInit
{
  protected serviceOrderStates: ServiceOrderStateDTO[] = [];
  protected serviceOrderState$: Observable<ServiceOrderStateDTO[]>;
  constructor(private readonly store: Store<AppState>) {
    super();
    this.serviceOrderState$ = this.store.select<ServiceOrderStateDTO[]>(
      (store) => store.serviceOrderStates
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
  ): ServiceOrderStateDTO | undefined {
    return this.serviceOrderStates?.find(
      (state: ServiceOrderStateDTO) => state.code === dataListItem.id
    );
  }

  public override writeValue(state: ServiceOrderStateDTO): void {
    if (state) this.inputValue = state?.name ?? '';
  }
}
