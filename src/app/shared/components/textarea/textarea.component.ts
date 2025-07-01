import { ControlContainer, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { Component, inject, Input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new Optional(), FormGroupDirective]],
    },
  ],
})
export class TextareaComponent {
  @Input() controlName: string = '';
  @Input() label = '';
  @Input() name = '';
  @Input() rows = 5;
  @Input() placeholder = 'Escribe aquí';

  private controlContainer = inject(ControlContainer);

  get control() {
    return this.controlContainer?.control?.get(this.controlName)
  }

  hasError(): boolean {
    return !!(this.control?.invalid && this.control?.touched)
  }

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
  }
}
