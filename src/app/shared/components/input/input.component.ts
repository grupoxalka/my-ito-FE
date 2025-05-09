import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() inputType: string = 'text';
  @Input() placeholderText: string = 'Escribe aquí';
  @Input() inputName: string = '';
  @Input() inputId: string = '';
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() labelText: string = '';
  @Input() errorMessage: string = '';
}
