import { Pipe, PipeTransform } from '@angular/core';
import { MasterDataCustomerDTO } from 'src/app/dtos/master-data/master-data-customer.dto';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Pipe({
  name: 'customerToDataListItem'
})
export class CustomerToDataListItemPipe implements PipeTransform {

  transform(value: MasterDataCustomerDTO[]): DatalistItem[] {
    return value.map(({id, firstName, lastName}) => ({id: `${id}` , value: `${firstName} ${lastName}`}));
  }

}
