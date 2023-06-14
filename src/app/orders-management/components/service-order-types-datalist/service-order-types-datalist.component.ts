import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { MasterDataOrderTypeDTO } from 'src/app/dtos/master-data/master-data-order-type.dto';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';
import { AppState } from 'src/app/store/state.model';

@Component({
  selector: 'service-order-types-datalist',
  template:
    '<shd-datalist [inputValue]="inputValue" [label]="label" [placeholder]="placeholder" [items]="serviceOrderTypes | serviceOrderTypeToDataListItem" (inputValueChange)="onInputValueChanges($event)"/>',
  styleUrls: ['./service-order-types-datalist.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ServiceOrderTypesDatalistComponent),
      multi: true,
    },
  ],
})
export class ServiceOrderTypesDatalistComponent
  extends DatalistComponent<MasterDataOrderTypeDTO>
  implements OnInit
{
  protected serviceOrderTypes: MasterDataOrderTypeDTO[] = [];
  protected serviceOrderTypes$: Observable<MasterDataOrderTypeDTO[]>;
  constructor(private readonly store: Store<AppState>) {
    super();
    this.serviceOrderTypes$ = this.store.select<MasterDataOrderTypeDTO[]>(
      ({ serviceOrderTypes }) => serviceOrderTypes
    );
  }

  ngOnInit(): void {
    this.serviceOrderTypes$
      .pipe(takeUntil(this.$destroy))
      .subscribe((serviceOrderTypes) => {
        this.serviceOrderTypes = serviceOrderTypes;
      });
  }

  protected override getEntityValue(
    dataListItem: DatalistItem
  ): MasterDataOrderTypeDTO | undefined {
    return this.serviceOrderTypes?.find(
      (state: MasterDataOrderTypeDTO) => state.id === +dataListItem.id
    );
  }

  public override writeValue(state: MasterDataOrderTypeDTO): void {
    if (state) this.inputValue = state?.name ?? '';
  }
}
