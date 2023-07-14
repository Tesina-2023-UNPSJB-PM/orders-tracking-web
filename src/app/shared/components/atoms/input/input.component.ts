import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'shd-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  onChange = (value: string) => {};
  onTouched?: () => void;

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(onChange: (value: string) => void): void {
    this.onChange = onChange;
  }
  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
  }
}
