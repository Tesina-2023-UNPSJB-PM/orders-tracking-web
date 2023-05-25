import { Pipe, PipeTransform } from '@angular/core';
import { ServiceOrderStateDTO } from 'src/app/dtos/service-order-state.dto';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Pipe({
  name: 'serviceOrderStateToDataListItem',
})
export class ServiceOrderStateToDataListItemPipe implements PipeTransform {
  transform(serviceOrderStates: ServiceOrderStateDTO[] | null): DatalistItem[] {
    if (!serviceOrderStates) return [];
    return serviceOrderStates.map(
      ({ code, name }) => ({ id: code, value: name } as DatalistItem)
    );
  }
}
