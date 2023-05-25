import { Pipe, PipeTransform } from '@angular/core';
import { CustomerDTO } from 'src/app/dtos/customer.dto';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Pipe({
  name: 'customerToDataListItem'
})
export class CustomerToDataListItemPipe implements PipeTransform {

  transform(value: CustomerDTO[]): DatalistItem[] {
    return value.map(({id, firstName, lastName}) => ({id: `${id}` , value: `${firstName} ${lastName}`}));
  }

}
