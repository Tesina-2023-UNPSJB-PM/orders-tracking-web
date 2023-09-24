import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, ReplaySubject, takeUntil } from 'rxjs';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';
import { AppState } from 'src/app/store/state.model';

@Component({
  selector: 'app-employee-datalist',
  template:
    '<shd-datalist [inputValue]="inputValue" [label]="label"  [placeholder]="placeholder" [items]="employees | employeeToDataListItem" (inputValueChange)="onInputValueChanges($event)"/>',
  styleUrls: ['./employee-datalist.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmployeeDatalistComponent),
      multi: true,
    },
  ],
})
export class EmployeeDatalistComponent
  extends DatalistComponent<MasterDataEmployeeDTO>
  implements OnInit
{
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject();
  protected employees: MasterDataEmployeeDTO[] = [];
  protected employee$: Observable<MasterDataEmployeeDTO[]>;

  constructor(private readonly store: Store<AppState>) {
    super();
    this.employee$ = this.store.select<MasterDataEmployeeDTO[]>(
      ({ employees }) => employees
    );
  }

  ngOnInit(): void {
    this.employee$
      .pipe(takeUntil(this.$destroy))
      .subscribe((employees) => {
        this.employees = employees; }
      );
  }

  protected override getEntityValue(
    dataListItem: DatalistItem
  ): MasterDataEmployeeDTO | undefined {
    return this.employees.find(
      (employee: MasterDataEmployeeDTO) => employee.id == +dataListItem.id
    );
  }

  public override writeValue(employee: MasterDataEmployeeDTO): void {
    if (employee)
      this.inputValue = `${employee?.firstName} ${employee?.lastName}`;

  }
}
