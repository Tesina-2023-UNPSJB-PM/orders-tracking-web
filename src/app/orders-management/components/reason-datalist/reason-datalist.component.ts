import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { MasterDataReasonStatusDTO } from 'src/app/dtos/master-data/master-data-reason-status.dto';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';
import { AppState } from 'src/app/store/state.model';

@Component({
  selector: 'reason-datalist',
  template: `<shd-datalist
    [inputValue]="inputValue"
    [label]="label"
    [placeholder]="placeholder"
    [items]="reasons | serviceOrderTypeToDataListItem"
    (inputValueChange)="onInputValueChanges($event)"
    [disabled]="disabled"
  />`,
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReasonDatalistComponent),
      multi: true,
    },
  ],
})
export class ReasonDatalistComponent
  extends DatalistComponent<MasterDataReasonStatusDTO>
  implements OnInit
{
  protected reasons: MasterDataReasonStatusDTO[] = [];
  protected reasons$: Observable<MasterDataReasonStatusDTO[]>;

  constructor(private readonly store: Store<AppState>) {
    super();
    this.reasons$ = this.store.select<MasterDataReasonStatusDTO[]>(
      ({ reasons }) => reasons
    );
  }

  ngOnInit(): void {
    this.reasons$
      .pipe(takeUntil(this.$destroy))
      .subscribe((data) => (this.reasons = data));
  }

  protected override getEntityValue(
    dataListItem: DatalistItem
  ): MasterDataReasonStatusDTO | undefined {
    return this.reasons?.find(
      (reason: MasterDataReasonStatusDTO) => reason.id === +dataListItem.id
    );
  }

  public override writeValue(state: MasterDataReasonStatusDTO): void {
    if (state) this.inputValue = state?.name ?? '';
  }
}
