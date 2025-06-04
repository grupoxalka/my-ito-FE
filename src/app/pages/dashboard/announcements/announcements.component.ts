import { Component, ViewChild } from '@angular/core';
import { TableAnnouncementsComponent } from "../../../shared/components/table-announcements/table-announcements.component";
import { AnnouncementsEditorComponent } from "../../../shared/components/announcements-editor/announcements-editor.component";
import Announcement from '../../../types/Announcement';
import EditorAnnouncement from '../../../types/EditorAnnouncement';

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
  isEditorOpen: boolean = false;
  setOpenEditor(value: boolean) {
    this.isEditorOpen = value;
  }
  @ViewChild(TableAnnouncementsComponent) tableAnnouncements!: TableAnnouncementsComponent;

  agregarNuevoAnuncio(anuncio: EditorAnnouncement) {
    const nuevoAnuncio: Announcement = { titulo: anuncio.title, name: 'Admin', fecha: '02-06-25', estatus: anuncio.estatus };
    this.tableAnnouncements.addAnnouncement(nuevoAnuncio);
    console.log('Nuevo anuncio agregado:', anuncio);
  }
}