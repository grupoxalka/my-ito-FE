import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { TextareaComponent } from '../textarea/textarea.component';
import EditorAnnouncement from '../../../types/EditorAnnouncement';

@Component({
  selector: 'app-announcements-editor',
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    ButtonComponent,
    ReactiveFormsModule
],
  templateUrl: './announcements-editor.component.html',
  styleUrl: './announcements-editor.component.css'
})
export class AnnouncementsEditorComponent {
  @Input() isEditorOpen = false;
  @Output() isEditorClose = new EventEmitter<void>();
  @Output() announcementCreated = new EventEmitter<EditorAnnouncement>();
  form = new FormGroup({
    sentTo: new FormControl('1', Validators.required),
    title: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });
  sent = false;
  audienceOptions = [
    { value: 'TEACHER', label: 'Profesores' },
    { value: 'STUDENT', label: 'Alumnos' },
    { value: 'ADMIN', label: 'Administrativos' }
  ];

  submitForm(status: boolean) {
    if (this.form.invalid){ 
      this.form.markAllAsTouched();
      console.error('Form is invalid', this.form.value);
      return;
    }
    const announcement: EditorAnnouncement = {
      title: this.form.value.title!,
      message: this.form.value.message!,
      sentTo: this.form.value.sentTo!,
      status
    };

    this.announcementCreated.emit(announcement);
    this.sent = true;
    console.log('Form submitted successfully', this.form.value);
  }

  resetForm() {
    this.form.reset();
    this.sent = false;
  }
  closeEditor() {
    this.isEditorOpen = false;
    this.isEditorClose.emit();
    this.form.reset();
    this.sent = false;
  }
}
