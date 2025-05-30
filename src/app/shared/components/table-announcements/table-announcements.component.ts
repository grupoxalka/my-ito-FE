import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import Announcement from '../../../types/Announcement';

@Component({
  selector: 'app-table-announcements',
  styleUrl: 'table-announcements.component.css',
  templateUrl: 'table-announcements.component.html',
  imports: [MatTableModule, MatPaginatorModule],
  standalone: true
})
export class TableAnnouncementsComponent implements AfterViewInit {
  displayedColumns: string[] = ['titulo', 'name', 'fecha', 'estatus', 'acciones'];
  dataSource = new MatTableDataSource<Announcement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEditAction(announcement: Announcement) {
    console.log('Edit action for:', announcement);
    // Implement edit logic here
  }
  onDeleteAction(announcement: Announcement) {
    console.log('Delete action for:', announcement);
    // Implement delete logic here
  }
}

const ELEMENT_DATA: Announcement[] = [
  { titulo: "Clases Inician 1", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 2", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 3", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 4", name: 'Admin Name', fecha: "19-02-24", estatus: 'enviado' },
  { titulo: "Clases Inician 5", name: 'Admin Name', fecha: "19-02-24", estatus: 'enviado' },
  { titulo: "Clases Inician 6", name: 'Admin Name', fecha: "19-02-24", estatus: 'enviado' },
  { titulo: "Clases Inician 7", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 8", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 9", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 10", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 11", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 12", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 13", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
  { titulo: "Clases Inician 14", name: 'Admin Name', fecha: "19-02-24", estatus: 'borrador' },
];