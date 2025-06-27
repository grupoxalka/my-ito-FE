import { Component, DestroyRef, inject, ViewChild } from '@angular/core';
import { TableAnnouncementsComponent } from "../../../shared/components/table-announcements/table-announcements.component";
import { AnnouncementsEditorComponent } from "../../../shared/components/announcements-editor/announcements-editor.component";
import Announcement from '../../../types/Announcement';
import EditorAnnouncement from '../../../types/EditorAnnouncement';
import { AnnouncementsService } from '../../../services/announcements.service';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [
    TableAnnouncementsComponent,
    AnnouncementsEditorComponent
  ],
  templateUrl: './announcements.component.html',
})
export class AnnouncementsComponent {
  private announcementsService = inject(AnnouncementsService);
  private destroyRef = inject(DestroyRef);
  private token: string = '';
  isEditorOpen: boolean = false;

  setOpenEditor(value: boolean) {
    this.isEditorOpen = value;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
  }
  addNewAnnouncement(anuncio: EditorAnnouncement) {
    const announcement = {
      tittle: anuncio.title,
      message: anuncio.message,
      sentTo: anuncio.sentTo,
      status: anuncio.status
    };
    const userId = "5bb9fa69-0156-4f5d-b152-9436090fbd66"

    const suscription = this.announcementsService.createAnnouncement(this.token, announcement, userId).subscribe({
      next: (ann) => {
        console.log('Anuncio creado', ann);
      },
      error: (err) => {
        console.error('Error al crear el anuncio', err);
      },
    });
    
    this.destroyRef.onDestroy(() => suscription.unsubscribe());

  }
}