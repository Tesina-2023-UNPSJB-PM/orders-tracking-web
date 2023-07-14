import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  ClarityModule,
  ClrCheckboxModule,
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
import { CheckboxComponent } from './atoms/checkbox/checkbox.component';

const COMPONENTS = [
  DatalistComponent,
  DatepickerComponent,
  InputComponent,
  TextareaComponent,
  NotifierComponent,
  CheckboxComponent,
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
    ClrCheckboxModule
  ],
  exports: [...COMPONENTS],
})
export class SharedComponentsModule {}
