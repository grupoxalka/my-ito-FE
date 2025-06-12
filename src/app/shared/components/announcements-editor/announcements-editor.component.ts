import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { TextareaComponent } from '../textarea/textarea.component';
import EditorAnnouncement from '../../../types/EditorAnnouncement';
import { BORRADOR_STATUS, ENVIADO_STATUS } from '../../../const/const';

@Component({
  selector: 'app-announcements-editor',
  imports: [
    CommonModule,
    FormsModule,
    InputComponent,
    SelectComponent,
    TextareaComponent,
    ButtonComponent
],
  templateUrl: './announcements-editor.component.html',
  styleUrl: './announcements-editor.component.css'
})
export class AnnouncementsEditorComponent {
  @Input() isEditorOpen = false;
  @Output() isEditorClose = new EventEmitter<void>();
  @Output() announcementCreated = new EventEmitter();

  sent = false;
  borradorStatus = BORRADOR_STATUS;
  enviadoStatus = ENVIADO_STATUS;

  announcement: EditorAnnouncement = {
    audience: '',
    title: '',
    message: '',
    estatus: BORRADOR_STATUS
  };

  audienceOptions = [
    { value: '1', label: 'Profesores' },
    { value: '2', label: 'Alumnos' },
    { value: '3', label: 'Administrativos' }
  ];

  submitForm(form: NgForm, estatus: string) {
    if (form.invalid) return;
    //Llamada al servicio para guardar/enviar.
    this.announcementCreated.emit({ ...this.announcement, estatus });
    this.sent = true;
  }

  createNew(form: NgForm) {
    form.reset();
    this.sent = false;
  }
  reset() {
    this.sent = false;
    this.announcement = { audience: '', title: '', message: '', estatus: BORRADOR_STATUS };
  }

  openForm() {
    this.isEditorOpen = true;
  }

  closeEditor() {
    this.isEditorOpen = false;
    this.isEditorClose.emit();
    this.reset();
  }
}
