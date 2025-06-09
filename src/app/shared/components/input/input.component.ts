import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new Optional(), FormGroupDirective]],
    },
  ],
})
export class InputComponent {

  //Reactive Form
  @Input() controlName?: string;

  //General Prompts
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() placeholder: string = 'Escribe aquí';
  @Input() label: string = '';
  @Input() maxlength: string = '72';
  @Input() disabled: boolean = false;

  //Standalone Prompts
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>()
  standaloneValue: string = '';


  constructor(private controlContainer: ControlContainer | null) { }
  ngOnInit() {
    if (!this.isReactiveForm) this.standaloneValue = this.value
  }
  ngOnChanges() {
    if (!this.isReactiveForm) this.standaloneValue = this.value
  }
  get isReactiveForm(): boolean {
    return !!(this.controlContainer && this.controlName)
  }
  get control() {
    return this.controlContainer?.control?.get(this.controlName!)
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

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.standaloneValue = target.value
    this.valueChange.emit(this.standaloneValue)
  }

}
