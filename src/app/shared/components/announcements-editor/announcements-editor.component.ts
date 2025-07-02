import { Component, EventEmitter, input, Input, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { TextareaComponent } from '../textarea/textarea.component';
import EditorAnnouncement from '../../../types/EditorAnnouncement';
import Announcement from '../../../types/Announcement';

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
  @Input() error = false;
  @Input() sent = false;
  @Input() isEditing = false;
  @Input() announcementToEdit: Announcement | null = null;   
  @Output() isEditorClose = new EventEmitter<void>();
  @Output() announcementCreated = new EventEmitter<EditorAnnouncement>();
  @Output() announcementUpdated = new EventEmitter<EditorAnnouncement>();
  @Output() resetEditor = new EventEmitter<void>();
  form = new FormGroup({
    sentTo: new FormControl('1', Validators.required),
    title: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  audienceOptions = [
    { value: 'TEACHER', label: 'Profesores' },
    { value: 'STUDENT', label: 'Alumnos' },
    { value: 'ADMIN', label: 'Administrativos' }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['announcementToEdit'] && this.announcementToEdit && this.isEditing) {
      this.populateForm();
    }
  }

  private populateForm() {
    if (this.announcementToEdit) {
      this.form.patchValue({
        sentTo: this.announcementToEdit.sentTo,
        title: this.announcementToEdit.tittle,
        message: this.announcementToEdit.message
      });
    }
  }
  
  submitForm(status: boolean) {
    if (this.form.invalid){ 
      this.form.markAllAsTouched();
      console.error('Form is invalid', this.form.value);
      return;
    }
    
    const announcement: EditorAnnouncement = {
      tittle: this.form.value.title!,
      message: this.form.value.message!,
      sentTo: this.form.value.sentTo!,
      status
    };

    if (this.isEditing) {
      this.announcementUpdated.emit(announcement);
    } else {
      this.announcementCreated.emit(announcement);
    }
  }

  resetForm() {
    this.form.reset();
    this.resetEditor.emit();
  }
  
  closeEditor() {
    this.isEditorClose.emit();
    this.resetEditor.emit();
    this.form.reset();
  }
}
