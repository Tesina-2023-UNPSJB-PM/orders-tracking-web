import { Pipe, PipeTransform } from '@angular/core';
import { MasterDataEmployeeDTO } from 'src/app/dtos/master-data/master-data-employee.dto';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Pipe({
  name: 'employeeToDataListItem',
})
export class EmployeeToDataListItemPipe implements PipeTransform {
  transform(value: MasterDataEmployeeDTO[]): DatalistItem[] {
    return value.map(({ id = -1, firstName, lastName }) => ({
      id: `${id}`,
      value: `${firstName} ${lastName}`,
    }));
  }
}
