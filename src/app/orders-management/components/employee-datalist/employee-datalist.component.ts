import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, map, takeUntil, tap } from 'rxjs';
import { EmployeeDTO } from 'src/app/dtos/employee.dto';
import { EmployeeApiService } from 'src/app/orders-management/services/apis/employee.api.service';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Component({
  selector: 'app-employee-datalist',
  template:
    '<shd-datalist [inputValue]="inputValue" [label]="label"  [placeholder]="placeholder" [items]="datalistItems" (inputValueChange)="onInputValueChanges($event)"/>',
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
  extends DatalistComponent<EmployeeDTO>
  implements OnInit
{
  private readonly _destroy: ReplaySubject<boolean> = new ReplaySubject();
  private _employees: EmployeeDTO[] = [];
  protected datalistItems: DatalistItem[] = [];

  constructor(private readonly _employeeApiSrv: EmployeeApiService) {
    super();
  }

  ngOnInit(): void {
    this._employeeApiSrv
      .get()
      .pipe(
        takeUntil(this._destroy),
        tap((employees: EmployeeDTO[]) => (this._employees = employees)),
        map((employees: EmployeeDTO[]) =>
          employees.map(
            (employee: EmployeeDTO) =>
              ({
                id: `${employee.userId}`,
                value: `${employee.firstName} ${employee.lastName}`,
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
  ): EmployeeDTO | undefined {
    return this._employees.find(
      (employee: EmployeeDTO) => employee.userId == +dataListItem.id
    );
  }

  public override writeValue(employee: EmployeeDTO): void {
    if (employee)
      this.inputValue = `${employee?.firstName} ${employee?.lastName}` ?? '';
  }
}
