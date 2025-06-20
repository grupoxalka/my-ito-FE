import { Component, inject, Output, output, signal, ViewChild } from '@angular/core';
import { TableUsersComponent } from "../../../shared/components/table-users/table-users.component";
import { UserEditorComponent } from '../../../shared/components/user-editor/user-editor.component';
import { InputComponent } from "../../../shared/components/input/input.component";
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { UsersService } from '../../../services/users.service';
import User from '../../../types/User';
import EditorUser from '../../../types/EditorUser';

@Component({
  selector: 'app-users',
  imports: [
    TableUsersComponent,
    UserEditorComponent,
    InputComponent,
    ModalComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  private usersService = inject(UsersService);

  users: User[] = [];
  filteredUsers: User[] = [...this.users];
  isEditorOpen: boolean = false;
  searchValue: string = '';
  totalPages = signal<number>(0);
  token: string = ''; // Get this token form localStorage later

  @ViewChild(ModalComponent) modal!: ModalComponent;
  @ViewChild(UserEditorComponent) userEditor!: UserEditorComponent;

  setOpenEditor(value: boolean) {
    this.isEditorOpen = value;
  }

  addNewUser(userData: EditorUser) {
    const user: User = {
      name: userData.name,
      paternalSurname: userData.lastName,
      maternalSurname: userData.secondLastName,
      email: userData.email,
      phone: userData.phone,
      role: userData.type,
      notes: userData.notes
    }

    this.usersService.addUser(this.token, user).subscribe({
      next: (usr) => {
        console.log('Usuario creado', usr);
        this.userEditor.error = false;
        this.userEditor.sent = true;
      },
      error: (err) => {
        console.error('Error al crear el usuario:', err);
        this.userEditor.error = true;
        this.userEditor.sent = true;
      }
    });
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
      user.name.toLowerCase().includes(value.toLowerCase()) ||
      user.email.toLowerCase().includes(value.toLowerCase())
    );
  }

  //Modal actions
  openModal() {
    this.modal.showModal();
  }
  onModalAction(confirmed: boolean) {
    if (confirmed) {
      this.isEditorOpen = false;
    } else {
      console.log('Modal closed without action');
    }
  }

  //Service integration
  ngOnInit(): void {
    this.usersService.signIn().subscribe({
      next: (res) => {
        this.token = res.token;
        this.loadTableUsers(this.token);
        console.log('Inicio de sesión exitoso:', res);
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
      }
    });
  }

  loadTableUsers(token: string, page: number = 0) {
    this.usersService.getUsers(token, page).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalPages.set(data.totalPages);
        console.log('Usuarios:', data);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  onTablePageChange(page: number) {
    this.loadTableUsers(this.token, page);
  }

}
