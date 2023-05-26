import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeDTO } from 'src/app/dtos/employee.dto';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Pipe({
  name: 'employeeToDataListItem',
})
export class EmployeeToDataListItemPipe implements PipeTransform {
  transform(value: EmployeeDTO[]): DatalistItem[] {
    return value.map(({ userId, firstName, lastName }) => ({
      id: `${userId}`,
      value: `${firstName} ${lastName}`,
    }));
  }
}
