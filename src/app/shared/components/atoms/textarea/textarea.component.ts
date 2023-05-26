import { Component, Input } from '@angular/core';

@Component({
  selector: 'shd-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
})
export class TextareaComponent {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
}
