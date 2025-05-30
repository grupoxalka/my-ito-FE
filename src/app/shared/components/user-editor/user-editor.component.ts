import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../input/input.component';
import { ButtonComponent } from '../button/button.component';
import { INPUT_TYPES } from '../../../const/const';

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, InputComponent, ButtonComponent],
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent {
  inputTypes = INPUT_TYPES;

  form = {
    type: '',
    name: '',
    lastName: '',
    secondLastName: '',
    email: '',
    phone: '',
    notes: ''
  };

  sent: boolean = false;
  showEditor: boolean = false;

  startEditor() {
    this.showEditor = true;
  }

  onCancel() {
    this.showEditor = false;
  }

  onSave() {
    const { type, name, lastName, email } = this.form;
    if (!type || !name || !lastName || !email) {
      alert('Completa los campos obligatorios');
      return;
    }

    this.sent = true;
    this.showEditor = false;
  }

  createNew() {
    this.form = {
      type: '',
      name: '',
      lastName: '',
      secondLastName: '',
      email: '',
      phone: '',
      notes: ''
    };
    this.sent = false;
    this.showEditor = true;
  }
}
