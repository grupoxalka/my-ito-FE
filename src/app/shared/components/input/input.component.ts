import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { INPUT_TYPES } from '../../../const/const';

@Component({
  selector: 'app-input',
  imports: [CommonModule, FormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = 'Escribe aquí';
  @Input() name: string = '';
  @Input() id: string = '';
  @Input() required: boolean = false; 
  @Input() disabled: boolean = false;
  @Input() label: string = '';
  @Input() model!: string;
  
  hasError: boolean = false;
  errorMessage: string = '';
  value: string = '';

  onInput(): void {  
    let isInvalid = false; 

    switch (this.type) {
      case INPUT_TYPES.MAIL: 
        this.value = this.value.replace(/\s+/g, '');  

        const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value); 
        if (!correoValido || this.value.length > 32) { 
          isInvalid = true; 
        }
        break;

      case INPUT_TYPES.TEL: //
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

    this.hasError = isInvalid; //
    this.errorMessage = isInvalid ? 'Revise la información' : '';
  }
}