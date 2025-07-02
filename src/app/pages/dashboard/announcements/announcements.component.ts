import { Component, DestroyRef, inject } from '@angular/core';
import { TableAnnouncementsComponent } from "../../../shared/components/table-announcements/table-announcements.component";
import { AnnouncementsEditorComponent } from "../../../shared/components/announcements-editor/announcements-editor.component";
import { AnnouncementsService } from '../../../services/announcements.service';
import { decodeToken, isTokenExpired, JwtPayload } from '../../../tools/jwt-utils';
import EditorAnnouncement from '../../../types/EditorAnnouncement';
import Announcement from '../../../types/Announcement';
import { ModalType } from '../../../enums/ModalType';
import { ModalComponent } from "../../../shared/components/modal/modal.component";

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [
    TableAnnouncementsComponent,
    AnnouncementsEditorComponent,
    ModalComponent
],
  templateUrl: './announcements.component.html',
})
export class AnnouncementsComponent {
  private announcementsService = inject(AnnouncementsService);
  private destroyRef = inject(DestroyRef);
  modalState = {
    isOpen: false,
    type: ModalType.DELETE
  }
  private token: string = '';
  private decodedToken: JwtPayload | null = null;
  private announcementToDelete: Announcement | null = null;
  

  announcements: Announcement[] = [];
  totalPages: number = 0;
  
  editorState = {
    open: false,
    sent: false,
    error: false,
    isEditing: false,
    editingAnnouncement: null as Announcement | null
  }

  setOpenEditor(value: boolean) {
    this.editorState.open = value;
    if (value) {
      this.resetEditorState();
    } else {
      this.editorState.isEditing = false;
      this.editorState.editingAnnouncement = null;
    }
  }

  resetEditorState() {
    this.editorState.sent = false;
    this.editorState.error = false;
  }

  editAnnouncement(announcement: Announcement) {
    this.setOpenEditor(true);
    this.editorState.isEditing = true;
    this.editorState.editingAnnouncement = announcement;
  }

  deleteAnnouncement(announcement: Announcement) {
      this.announcementToDelete = announcement;
      this.openModal(ModalType.DELETE);
  }

  //Modal actions
  openModal(type: ModalType): void {
    this.modalState.isOpen = true;
    this.modalState.type = type;
  }
  modalClose(): void {
    this.modalState.isOpen = false;
    console.log('Modal cerrado');
  }

  modalConfirm(): void {
    //Delete user action
    if (this.modalState.type === ModalType.DELETE) {
      const suscription = this.announcementsService.deleteAnnouncement(this.token, this.announcementToDelete!.id!).subscribe({
        next: () => {
          console.log('Anuncio eliminado con exito:', this.announcementToDelete);
          this.loadTableAnnouncements();
        },
        error: (err) => {
          console.error('Error al eliminar el Anuncio:', err);
        }
      });
      this.destroyRef.onDestroy(() => suscription.unsubscribe());
    }

    this.modalState.isOpen = false;
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

  updateAnnouncement(anuncio: EditorAnnouncement) {
    const announcementId = this.editorState.editingAnnouncement!.id!;
    const suscription = this.announcementsService.updateAnnouncement(this.token, announcementId, anuncio).subscribe({
      next: (ann) => {
        console.log('Anuncio actualizado', ann);
        this.editorState.sent = true;
        this.editorState.error = false;
        this.loadTableAnnouncements();
      },
      error: (err) => {
        console.error('Error al actualizar el anuncio', err);
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