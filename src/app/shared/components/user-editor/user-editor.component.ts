import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, Validators, FormControl } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import User from '../../../types/User';

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent
  ],
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent {
  @Input() isEditorOpen = true;
  @Output() isEditorClose = new EventEmitter<void>();
  @Output() userCreated = new EventEmitter();

  form = new FormGroup({
    type: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    secondLastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/^\d{10}$/), Validators.maxLength(10)],
    }),
    notes: new FormControl(''),
  });
  sent = false;
  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.sent = true;
  }

  submitForm() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    //Llamada al servicio para guardar/enviar.
    this.userCreated.emit({ ...this.form.value });
    this.sent = true;
  }


  createNew() {
    this.form.reset();
    this.sent = false;
  }
  closeEditor() {
    this.isEditorOpen = false;
    this.isEditorClose.emit();
    this.form.reset();
    this.sent = false;
  }
  editUser(user: User) {

    this.form.patchValue({
      type: user.tipo,
      name: user.nombre.split(' ')[0],
      lastName: user.nombre.split(' ')[1],
      secondLastName: user.nombre.split(' ')[2] || '',
      email: user.correo,
      phone: '272 727 2727',
      notes: user.notas || ''
    });
    this.isEditorOpen = true;
  }

}