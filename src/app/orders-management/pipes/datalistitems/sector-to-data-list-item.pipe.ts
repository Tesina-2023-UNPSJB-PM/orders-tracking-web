import { Pipe, PipeTransform } from '@angular/core';
import { SectorDTO } from 'src/app/dtos/sector.dto';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Pipe({ name: 'sectorToDataListItem' })
export class SectorToDataListItemPipe implements PipeTransform {
  transform(sectorList: SectorDTO[]): DatalistItem[] {
    if (!sectorList) return [];

    return sectorList.map(
      ({ id, name: value }) => ({ id: id + '', value } as DatalistItem)
    );
  }
}
