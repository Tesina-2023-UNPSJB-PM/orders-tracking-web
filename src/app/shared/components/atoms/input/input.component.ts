import { Component, Input } from '@angular/core';

@Component({
  selector: 'shd-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent {
  @Input() name: string = '';
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;
}
