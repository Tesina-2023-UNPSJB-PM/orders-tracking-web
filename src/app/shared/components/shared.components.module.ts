import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrDatalistModule, ClrDatepickerModule } from '@clr/angular';
import { DatalistComponent } from './datalist/datalist.component';
import { DatepickerComponent } from './datepicker/datepicker.component';

const COMPONENTS = [DatalistComponent, DatepickerComponent]

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, FormsModule, ClrDatalistModule, ClrDatepickerModule],
  exports: [...COMPONENTS],
})
export class SharedComponentsModule {}
