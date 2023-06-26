import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { SectorDTO } from 'src/app/dtos/sector.dto';
import { DatalistComponent } from 'src/app/shared/components/atoms/datalist/datalist.component';
import { DatalistItem } from 'src/app/shared/components/atoms/datalist/datalist.interfaces';

@Component({
  selector: 'app-sector-datalist',
  template: `
    <shd-datalist [inputValue]="inputValue" [label]="label" [placeholder]="placeholder" [items]="sectorList | sectorToDataListItem" (inputValueChange)="onInputValueChanges($event)"/>
  `,
  providers:[
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SectorDatalistComponent),
      multi: true,
    },
  ]
})
export class SectorDatalistComponent
  extends DatalistComponent<SectorDTO>
  implements OnInit {

    protected sectorList: SectorDTO[] = [];

  ngOnInit(): void {
    this.sectorList.push({id: 1, name: 'Mantenimiento Electrico'});
    this.sectorList.push({id: 2, name: 'Mantenimiento Red Agua/Cloacas'});
    this.sectorList.push({id: 3, name: 'Alta y Corte Agua/Cloacas'});
    this.sectorList.push({id: 4, name: 'Alta y Corte Electricidad'});
  }

  protected override getEntityValue(
    dataListItem: DatalistItem
  ): SectorDTO | undefined {
    return this.sectorList?.find(
      (sector) => sector.id?.toString() === dataListItem.id
    );
  }

}
