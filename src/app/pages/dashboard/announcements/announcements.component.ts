import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';

interface Announcement {
  audience: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    TextareaComponent

  ],
  templateUrl: './announcements.component.html',
})
export class AnnouncementsComponent {
  sent = false;

  announcement: Announcement = {
    audience: '',
    title: '',
    message: ''
  };

  audienceOptions = [
    { value: '1', label: 'Profesores' },
    { value: '2', label: 'Alumnos' },
    { value: '3', label: 'Administrativos' }
  ];

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    //Llamada al servicio para guardar/enviar.
    this.sent = true;
  }

  reset() {
    this.sent = false;
    this.announcement = { audience: '', title: '', message: '' };
  }
}
