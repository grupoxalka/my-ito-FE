import {Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DatePipe, NgClass } from '@angular/common';

import User from '../../../types/User';

@Component({
  selector: 'app-table-users',
  imports: [DatePipe, NgClass],
  templateUrl: './table-users.component.html',
  styleUrl: './table-users.component.css'
})
export class TableUsersComponent {
  @Input() tableName: string = 'Usuarios';
  @Input() users: User[] = [];
  @Input() totalPages: number = 0;

  @Output() deleteUser = new EventEmitter<User>();
  @Output() editUser = new EventEmitter<User>();
  @Output() pageChanged = new EventEmitter<number>();
  currentPage: number = 0;
  totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i);

  ngOnChanges(): void {
    this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i);
  }

  onEditAction(user: User) {
    console.log('Edit action for:', user);
    this.editUser.emit(user);
  }
  onDeleteAction(user: User) {
    console.log('Delete action for:', user);
    this.deleteUser.emit(user);
  }

  onPageChange(page: number) {
    if( page < 0 || page >= this.totalPages) return;

    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
  }

  convertRoleToLabel(role: string): string {
    switch (role) {
      case 'ito_admin':
        return 'Administrador';

      case 'ito_teacher':
        return 'Profesor';

      case 'ito_student':
        return 'Alumno';

      case 'ito_super_admin':
        return 'Moderador';
        
      default:
        return 'Desconocido';
    }
  }

}