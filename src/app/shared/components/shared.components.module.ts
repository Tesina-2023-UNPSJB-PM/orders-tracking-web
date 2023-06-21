import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ClarityModule,
  ClrDatalistModule,
  ClrDatepickerModule,
  ClrInputModule,
  ClrTextareaModule,
} from '@clr/angular';
import { DatalistComponent } from './atoms/datalist/datalist.component';
import { DatepickerComponent } from './atoms/datepicker/datepicker.component';
import { InputComponent } from './atoms/input/input.component';
import { TextareaComponent } from './atoms/textarea/textarea.component';
import { NotifierComponent } from './atoms/notifier/notifier.component';

const COMPONENTS = [
  DatalistComponent,
  DatepickerComponent,
  InputComponent,
  TextareaComponent,
  NotifierComponent,
];

@NgModule({
  declarations: [...COMPONENTS, NotifierComponent],
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ClrDatalistModule,
    ClrDatepickerModule,
    ClrInputModule,
    ClrTextareaModule,
  ],
  exports: [...COMPONENTS],
})
export class SharedComponentsModule {}
