import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import User from '../../../types/User';

@Component({
  selector: 'app-table-users',
  imports: [MatTableModule, MatPaginatorModule],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  displayedColumns: string[] = ['nombre', 'tipo', 'fecha', 'correo', 'notas', 'acciones'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onEditAction(user: User) {
    console.log('Edit action for:', user);
    // Implement edit logic here
  }
  onDeleteAction(user: User) {
    console.log('Delete action for:', user);
    // Implement delete logic here
  }
}

const ELEMENT_DATA: User[] = [
  { nombre: "Juan Perez", tipo: 'Estudiante', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
  { nombre: "Juan Perez 2", tipo: 'Administrativo', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
  { nombre: "Juan Perez 3", tipo: 'Administrativo', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
  { nombre: "Juan Perez 4", tipo: 'Estudiante', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
  { nombre: "Juan Perez 5", tipo: 'Estudiante', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
  { nombre: "Juan Perez 6", tipo: 'Profesor', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
  { nombre: "Juan Perez 7", tipo: 'Estudiante', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
  { nombre: "Juan Perez 8", tipo: 'Estudiante', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },

];