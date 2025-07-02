import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() controlName?: string;
  @Input() model: any;

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() options: { value: string; label: string; disabled?: boolean }[] = [];
  @Input() placeholder: string = 'Selecciona uno';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  @Input() error: boolean = false;
  @Input() errorMessage: string = 'Este campo es requerido';

  @Output() modelChange = new EventEmitter<string | null>();
  @Output() onSelect = new EventEmitter<string | null>();

  isFocused: boolean = false;

  constructor(private controlContainer: ControlContainer | null) { }

  get isReactiveForm(): boolean {
    return !!(this.controlContainer && this.controlName);
  }

  get control() {
    return this.controlContainer?.control?.get(this.controlName!);
  }

  hasError(): boolean {
    return !!(this.control?.invalid && this.control?.touched);
  }

  onChange(value: string | null) {
    this.model = value;
    this.modelChange.emit(value);
    this.onSelect.emit(value);
    if (this.error && value) this.error = false;
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
    if (this.required && !this.model) this.error = true;
  }
}
