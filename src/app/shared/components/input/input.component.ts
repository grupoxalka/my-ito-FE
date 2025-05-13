import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() inputType: string = 'text';
  @Input() inputPlaceholder: string = 'Escribe aquí';
  @Input() inputName: string = '';
  @Input() inputId: string = '';
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() inputLabel: string = '';

  hasError: boolean = false;
  errorMessage: string = '';
  inputValue: string = '';

  validateInput(): void {
    let isInvalid = false;

    switch (this.inputType) {
      case 'mail':
        this.inputValue = this.inputValue.replace(/\s+/g, '');

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.inputValue);
        if (!correoValido || this.inputValue.length > 32) {
          isInvalid = true;
        }
        break;

      case 'tel':
        this.inputValue = this.inputValue.replace(/\D/g, '');

        if (this.inputValue.length === 10) {
          this.inputValue = this.inputValue.replace(/^(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4');
        } else {
          isInvalid = true;
        }
        break;

      case 'password':
        this.inputValue = this.inputValue.replace(/\s+/g, '');

        if (this.inputValue.length < 8 || this.inputValue.length > 64) {
          isInvalid = true;
        }
        break;

      default:
        if (this.inputValue.length > 72) {
          isInvalid = true;
        }
        break;
    }

    this.hasError = isInvalid;
    this.errorMessage = isInvalid ? 'Revise la información' : '';
  }
}