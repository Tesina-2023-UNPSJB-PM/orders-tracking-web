import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { DatalistItem } from './datalist.interfaces';

@Component({
  selector: 'shd-datalist',
  templateUrl: './datalist.component.html',
  styleUrls: ['./datalist.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatalistComponent),
      multi: true,
    },
  ],
})
export class DatalistComponent<T> implements OnDestroy, ControlValueAccessor {
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() items: DatalistItem[] = [];
  @Output() protected inputValueChange: EventEmitter<DatalistItem> =
    new EventEmitter<DatalistItem>();
  public inputValue = '';
  protected onChange: any = () => {};
  protected onTouch: any = () => {};
  protected $destroy: ReplaySubject<boolean> = new ReplaySubject();

  protected getEntityValue?(dataListItem: DatalistItem): T | undefined;

  protected onInputValueChanges(dataListItem: DatalistItem): void {
    const entityValue = this.getEntityValue?.(dataListItem);
    this.onChange(entityValue);
  }

  protected onValueSelected(dataListItemValue: string) {
    const dataListItem = this.items.find(
      (item) => item.value === dataListItemValue
    );
    if (dataListItem) {
      this.inputValueChange.emit(dataListItem);
    }
  }

  public registerOnChange(onChange: (value: T) => void): void {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouch: any): void {
    this.onTouch = onTouch;
  }

  public writeValue(value: T): void {
    /** @todo implement if an initial value is needed  */
  }

  ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.unsubscribe();
  }
}
