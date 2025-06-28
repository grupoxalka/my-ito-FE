import { Component, DestroyRef, inject } from '@angular/core';
import { TableAnnouncementsComponent } from "../../../shared/components/table-announcements/table-announcements.component";
import { AnnouncementsEditorComponent } from "../../../shared/components/announcements-editor/announcements-editor.component";
import { AnnouncementsService } from '../../../services/announcements.service';
import { decodeToken, isTokenExpired, JwtPayload } from '../../../tools/jwt-utils';
import EditorAnnouncement from '../../../types/EditorAnnouncement';
import Announcement from '../../../types/Announcement';

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
  private decodedToken: JwtPayload | null = null;

  announcements: Announcement[] = [];
  totalPages: number = 0;
  
  isEditorOpen: boolean = false;
  editorState = {
    sent: false,
    error: false,
  }

  setOpenEditor(value: boolean) {
    this.isEditorOpen = value;
    if (value) {
      this.resetEditorState();
    }
  }

  resetEditorState() {
    this.editorState.sent = false;
    this.editorState.error = false;
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.loadTableAnnouncements();
    
    if (this.token) {
      this.decodedToken = decodeToken(this.token);      

      if (isTokenExpired(this.token)) {
        console.warn('El token ha expirado');
      }
      
      console.log('Token decodificado:', this.decodedToken);
    }
  }
  addNewAnnouncement(anuncio: EditorAnnouncement) {
    const announcement = {
      tittle: anuncio.tittle,
      message: anuncio.message,
      sentTo: anuncio.sentTo,
      status: anuncio.status
    };
    const userId = this.decodedToken!['userId']
    const suscription = this.announcementsService.createAnnouncement(this.token, announcement, userId).subscribe({
      next: (ann) => {
        console.log('Anuncio creado', ann);
        this.editorState.sent = true;
        this.editorState.error = false;
      },
      error: (err) => {
        console.error('Error al crear el anuncio', err);
        this.editorState.error = true;
        this.editorState.sent = true;
      },
    });
    this.destroyRef.onDestroy(() => suscription.unsubscribe());
  }

  private loadTableAnnouncements(page: number = 0) {
    const suscription = this.announcementsService.getAnnouncements(this.token, page).subscribe({
      next: (data) => {
        this.announcements = data.content;
        this.totalPages = data.totalPages;
        console.log('Anuncios:', data);
      },
      error: (err) => {
        console.error('Error al obtener anuncios:', err);
      }
    });
    this.destroyRef.onDestroy(() => suscription.unsubscribe());
  }

  onTablePageChange(page: number): void {
    this.loadTableAnnouncements(page);
  }

}