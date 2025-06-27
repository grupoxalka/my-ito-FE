import { ControlContainer, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter, inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< Updated upstream
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';
=======
>>>>>>> Stashed changes

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
<<<<<<< Updated upstream
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() controlName?: string;
  @Input() model: any;

  @Input() id: string = '';
=======
  templateUrl: './select.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new Optional(), FormGroupDirective]],
    },
  ],
})
export class SelectComponent {
  @Input() controlName: string = '';
>>>>>>> Stashed changes
  @Input() label: string = '';
  @Input() options: { value: string; label: string; disabled?: boolean }[] = [];
  @Input() placeholder: string = 'Selecciona uno';
<<<<<<< Updated upstream
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;

  @Input() error: boolean = false;
  @Input() errorMessage: string = 'Este campo es requerido';

  @Output() modelChange = new EventEmitter<string | null>();
  @Output() onSelect = new EventEmitter<string | null>();
=======
>>>>>>> Stashed changes

  private controlContainer = inject(ControlContainer);

<<<<<<< Updated upstream
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
=======
  get control() {
    return this.controlContainer?.control?.get(this.controlName)
>>>>>>> Stashed changes
  }

  hasError(): boolean {
    return !!(this.control?.invalid && this.control?.touched)
  }

<<<<<<< Updated upstream
  onBlur() {
    this.isFocused = false;
    if (this.required && !this.model) this.error = true;
=======
  getErrorMessage(): string {
    if (!this.control?.errors) return ""

    const errors = this.control.errors

    if (errors["required"]) return "Este campo es obligatorio"
    if (errors["minlength"]) return `Mínimo ${errors["minlength"].requiredLength} caracteres`
    if (errors["email"]) return "Formato de correo inválido"
    if (errors["pattern"]) return "Formato inválido"
    if (errors["min"]) return `El valor mínimo es ${errors["min"].min}`
    if (errors["max"]) return `El valor máximo es ${errors["max"].max}`

    return "Campo inválido"
>>>>>>> Stashed changes
  }
}
