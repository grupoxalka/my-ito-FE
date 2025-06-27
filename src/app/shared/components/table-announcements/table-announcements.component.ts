import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import Announcement from '../../../types/Announcement';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-table-announcements',
  styleUrl: 'table-announcements.component.css',
  templateUrl: 'table-announcements.component.html',
  imports: [DatePipe, NgClass],
  standalone: true
})
export class TableAnnouncementsComponent {
  @Input() tableName: string = 'Anuncios';
  @Input() announcements: Announcement[] = [];
  @Input() totalPages: number = 0;
  
  @Output() editAnnouncement = new EventEmitter<Announcement>();
  @Output() deleteAnnouncement = new EventEmitter<Announcement>();
  @Output() pageChanged = new EventEmitter<number>();

  currentPage: number = 0;
  totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i);

  ngOnChanges(): void {
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i);
  }

  onEditAction(announcement: Announcement) {
    console.log('Edit action for:', announcement);
    this.editAnnouncement.emit(announcement);
  }
  onDeleteAction(announcement: Announcement) {
    console.log('Delete action for:', announcement);
    this.deleteAnnouncement.emit(announcement);
  }
  onPageChange(page: number) {
    if( page < 0 || page >= this.totalPages) return;

    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }
}



