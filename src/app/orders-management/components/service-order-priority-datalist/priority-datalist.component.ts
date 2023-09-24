import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MasterDataOrderPriorityDTO } from 'src/app/dtos/master-data/master-data-order-priority.dto';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';
import { AppState } from 'src/app/store/state.model';

@Component({
  selector: 'app-priority-datalist',
  template:
    '<shd-datalist [inputValue]="inputValue" [label]="label" [placeholder]="placeholder" [items]="orderPriorityList | serviceOrderStateToDataListItem" (inputValueChange)="onInputValueChanges($event)"/>',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PriorityDatalistComponent),
      multi: true,
    },
  ]
})
export class PriorityDatalistComponent
  extends DatalistComponent<MasterDataOrderPriorityDTO>
  implements OnInit
{
  protected orderPriorityList: MasterDataOrderPriorityDTO[] = [];
  protected orderPriorityList$: Observable<MasterDataOrderPriorityDTO[]>;

  constructor(private readonly store: Store<AppState>) {
    super();
    this.orderPriorityList$ = this.store.select<MasterDataOrderPriorityDTO[]>(
      ({ serviceOrderPriorities }) => serviceOrderPriorities
    );
  }

  ngOnInit(): void {
    this.orderPriorityList.push({code: 'LOW', name : 'Baja'});
    this.orderPriorityList.push({code: 'MEDIUM', name : 'Media'});
    this.orderPriorityList.push({code: 'HIGH', name : 'Alta'});
  }

  protected override getEntityValue(
    dataListItem: DatalistItem
  ): MasterDataOrderPriorityDTO | undefined {
    return this.orderPriorityList?.find(
      (priority: MasterDataOrderPriorityDTO) => priority.code === dataListItem.id
    );
  }

  public override writeValue(state: MasterDataOrderPriorityDTO): void {
    if (state) this.inputValue = state?.name ?? '';
  }
}
