import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { INPUT_TYPES } from '../../../const/const';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: string = 'text'; //este puede ser un string 
  @Input() placeholder: string = 'Escribe aquí';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() label: string = '';

  hasError: boolean = false;
  errorMessage: string = '';
  value: string = '';

  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(val: any): void {
    this.value = val || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event?: any): void {
    if (event) this.value = event.target.value;

    let isInvalid = false;

    switch (this.type) {
      case INPUT_TYPES.MAIL:
        this.value = this.value.replace(/\s+/g, '');
        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
        if (!correoValido || this.value.length > 32) {
          isInvalid = true;
        }
        break;

      case INPUT_TYPES.TEL:
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length === 10) {
          this.value = this.value.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
        } else {
          isInvalid = true;
        }
        break;

      case INPUT_TYPES.PASSWORD:
        this.value = this.value.replace(/\s+/g, '');
        if (this.value.length < 8 || this.value.length > 64) {
          isInvalid = true;
        }
        break;

      default:
        if (this.value.length > 72) {
          isInvalid = true;
        }
        break;
    }

    this.hasError = isInvalid;
    this.errorMessage = isInvalid ? 'Revise la información' : '';

    this.onChange(this.value);
    this.onTouched();
  }
}
