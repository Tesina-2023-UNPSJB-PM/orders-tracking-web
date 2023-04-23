import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { map, takeUntil, tap } from 'rxjs';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { ServiceOrderApiService } from 'src/app/orders-management/services/apis/service-order.api.service';
import { DatalistComponent } from 'src/app/shared/components/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/datalist/datalist.interfaces';

@Component({
  selector: 'app-status-filter',
  template:
    '<shd-datalist [label]="label" [placeholder]="placeholder" [items]="datalistItems" (inputValueChange)="onInputValueChanges($event)"/>',
  styleUrls: ['./status-filter.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatusFilterComponent),
      multi: true,
    },
  ],
})
export class StatusFilterComponent
  extends DatalistComponent<ServiceOrderStateDTO>
  implements OnInit
{
  protected datalistItems: DatalistItem[] = [];
  private _serviceOrderStates: any[] = [];
  constructor(private readonly serviceOrderApiSrv: ServiceOrderApiService) {
    super();
  }

  ngOnInit() {
    this.serviceOrderApiSrv
      .getServiceOrderStates()
      .pipe(
        takeUntil(this.$destroy),
        tap(
          (serviceOrderStates) =>
            (this._serviceOrderStates = serviceOrderStates)
        ),
        map((serviceOrderStates) =>
          serviceOrderStates.map(
            ({ code, name }) => ({ id: code, value: name } as DatalistItem)
          )
        )
      )
      .subscribe({
        next: (dataListItems) => (this.datalistItems = dataListItems),
      });
  }

  protected override getEntityValue(dataListItem: DatalistItem): ServiceOrderStateDTO {
    return this._serviceOrderStates.find(
      (state: ServiceOrderStateDTO) => state.code === dataListItem.id
    );
  }
}
