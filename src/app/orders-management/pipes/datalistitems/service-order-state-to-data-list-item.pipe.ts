import { Pipe, PipeTransform } from '@angular/core';
import { MasterDataOrderStatusDTO } from 'src/app/dtos/master-data/master-data-order-status.dto';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Pipe({
  name: 'serviceOrderStateToDataListItem',
})
export class ServiceOrderStateToDataListItemPipe implements PipeTransform {
  transform(serviceOrderStates: MasterDataOrderStatusDTO[] | null): DatalistItem[] {
    if (!serviceOrderStates) return [];
    return serviceOrderStates.map(
      ({ code, name }) => ({ id: code, value: name } as DatalistItem)
    );
  }
}
