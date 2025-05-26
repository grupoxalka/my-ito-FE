import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule }from '@angular/common';
import { FormsModule }from '@angular/forms';


@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() label: string = '';
  @Input() name:  string = '';
  @Input() options: { value: string; label: string }[] = [];
  @Input() model!: string;
  @Output() modelChange = new EventEmitter<string>();

    onChange(v: string) {
    this.model = v;
    this.modelChange.emit(v);
  }
}