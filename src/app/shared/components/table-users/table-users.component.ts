import { AfterViewInit, Component, EventEmitter, Input, Output, output, ViewChild } from '@angular/core';
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
  @Input() tableName: string = 'Usuarios';
  @Input() users: User[] = [];
  @Output() deleteUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();

  displayedColumns: string[] = ['nombre', 'tipo', 'fecha', 'correo', 'notas', 'acciones'];

  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    this.dataSource.data = this.users;
  }

  onEditAction(user: User) {
    console.log('Edit action for:', user);
    this.editUser.emit(user);
  }
  onDeleteAction(user: User) {
    console.log('Delete action for:', user);
    this.deleteUser.emit(user);
  }

  addUser(newUser: User) {
    this.users = [newUser, ...this.users];
    this.dataSource.data = this.users;
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}