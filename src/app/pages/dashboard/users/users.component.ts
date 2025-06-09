import { Component, ViewChild } from '@angular/core';
import { TableUsersComponent } from "../../../shared/components/table-users/table-users.component";
import { UserEditorComponent } from '../../../shared/components/user-editor/user-editor.component';
import { InputComponent } from "../../../shared/components/input/input.component";
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import User from '../../../types/User';
import EditorUser from '../../../types/EditorUser';
import generateID from '../../../tools/generateID';

@Component({
  selector: 'app-users',
  imports: [TableUsersComponent, UserEditorComponent, InputComponent, ModalComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users: User[] = [
    { id: 1,  nombre: "Juan Perez", tipo: 'Alumnos', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
    { id: 2,  nombre: "Juan Perez 2", tipo: 'Administrativos', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
    { id: 3,  nombre: "Juan Perez 3", tipo: 'Administrativos', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
    { id: 4,  nombre: "Juan Perez 4", tipo: 'Alumnos', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
    { id: 5,  nombre: "Juan Perez 5", tipo: 'Alumnos', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
    { id: 6,  nombre: "Juan Perez 6", tipo: 'Profesores', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
    { id: 7,  nombre: "Juan Perez 7", tipo: 'Alumnos', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },
    { id: 8,  nombre: "Juan Perez 8", tipo: 'Alumnos', correo: 'correo@correo.com', fecha: "19-02-24", notas: 'Nota 1' },

  ];
  filteredUsers: User[] = [...this.users];
  isEditorOpen: boolean = false;
  userToEdit?: User;
  searchValue: string = '';
  
  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(UserEditorComponent) userEditor!: UserEditorComponent;


  setOpenEditor(value: boolean) {
    this.isEditorOpen = value;
  }

  addNewUser(user: EditorUser) {
    const nuevoUsuario: User = { 
      id: generateID(),
      nombre: user.name + user.lastName + user.secondLastName,
      tipo: user.type,
      correo: user.email,
      fecha: '02-06-25',
      notas: user.notes,
    };
    this.users = [nuevoUsuario, ...this.users];
    console.log('Nuevo anuncio agregado:', nuevoUsuario);
  }

  deleteUser(user: User) {
    this.modal.showModal();
    this.users = this.users.filter(u => u !== user);
    this.filteredUsers = this.filterUsers(this.searchValue);
    console.log('Usuario eliminado:', user);
  }

  editUser(user: User) {
    this.userEditor.editUser(user);
  }

  search(value: string) {
    this.searchValue = value;
    this.filteredUsers = this.filterUsers(value);
  }
  filterUsers(value: string): User[] {
    if (!value) return [...this.users];
    return this.users.filter(user =>
      user.nombre.toLowerCase().includes(value.toLowerCase()) ||
      user.correo.toLowerCase().includes(value.toLowerCase())
    );
  }

  //Modal actions
  openModal(){
    this.modal.showModal();
  }
  onModalAction(confirmed: boolean) {
    if (confirmed) {
      this.isEditorOpen = false;
    } else {
      console.log('Modal closed without action');
    }
  }
}
