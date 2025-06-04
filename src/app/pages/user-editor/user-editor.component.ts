import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { SelectComponent } from '../../shared/components/select/select.component';
import { TextareaComponent } from '../../shared/components/textarea/textarea.component';
import { INPUT_TYPES } from '../../const/const';

@Component({
  selector: 'app-user-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    TextareaComponent
  ],
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.css']
})
export class UserEditorComponent implements OnInit { //
  form!: FormGroup;
  inputTypes = INPUT_TYPES;
  sent =  true;
  showEditor = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['Default', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      secondLastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      notes: [''],
      inputStandard: ['Default']
    });
  }

  startEditor() {
    this.showEditor = true;
  }

  onCancel() {
    this.showEditor = false;
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.sent = true;
    this.showEditor = false;
  }

  createNew() {
    this.form.reset({
      type: 'Default',
      inputStandard: 'Default'
    });
    this.sent = false;
    this.showEditor = true;
  }
}