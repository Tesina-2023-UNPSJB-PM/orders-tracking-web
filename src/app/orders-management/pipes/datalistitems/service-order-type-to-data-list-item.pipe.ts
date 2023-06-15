import { Pipe, PipeTransform } from '@angular/core';
import { MasterDataOrderTypeDTO } from 'src/app/dtos/master-data/master-data-order-type.dto';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Pipe({
  name: 'serviceOrderTypeToDataListItem',
})
export class ServiceOrderTypeToDataListItemPipe implements PipeTransform {
  transform(serviceOrderTypes: MasterDataOrderTypeDTO[]): DatalistItem[] {
    if (!serviceOrderTypes) return [];
    return serviceOrderTypes.map(
      ({ id, name: value }) => ({ id: id + '', value } as DatalistItem)
    );
  }
}
