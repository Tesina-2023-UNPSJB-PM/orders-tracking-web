import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'shd-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() checkboxes: CheckboxConfig[] = [];

  onChange = (checkboxes: CheckboxConfig[]) => {};
  onTouched?: () => void;

  public onSelectionChange(): void {
    this.onChange(this.checkboxes);
  }

  writeValue(obj: any): void {
    this.checkboxes = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

export interface CheckboxConfig {
  label: string;
  value: string;
  selected: boolean;
}
