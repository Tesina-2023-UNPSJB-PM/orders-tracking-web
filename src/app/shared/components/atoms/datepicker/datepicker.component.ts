import { Component, Input, OnDestroy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'shd-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerComponent),
      multi: true,
    },
  ],
})
export class DatepickerComponent implements OnDestroy, ControlValueAccessor {
  @Input() label: string = '';
  value = '';

  protected onChange: any = () => {};
  protected onTouch: any = () => {};
  protected $destroy: ReplaySubject<boolean> = new ReplaySubject();

  protected onValueChanges(date: string) {
    console.log('onValueChanges', date, this.value);
    this.onChange(new Date(date));
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch;
  }

  public writeValue(obj: any): void {
    /** @todo implement if an initial value is needed  */
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
