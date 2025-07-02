import { Component, DestroyRef, inject, signal, ViewChild } from '@angular/core';
import { TableUsersComponent } from "../../../shared/components/table-users/table-users.component";
import { UserEditorComponent } from '../../../shared/components/user-editor/user-editor.component';
import { InputComponent } from "../../../shared/components/input/input.component";
import { ModalComponent } from "../../../shared/components/modal/modal.component";
import { UsersService } from '../../../services/users.service';
import User from '../../../types/User';
import EditorUser from '../../../types/EditorUser';
import { ModalType } from '../../../enums/ModalType';

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
  private destroyRef = inject(DestroyRef);
  private isEditing = false;
  private editingUserId: string | null = null;

  users: User[] = [];
  searchedUsers: User[] = [];
  isEditorOpen: boolean = false;
  searchValue: string = '';
  totalPages: number = 0
  totalPagesSearched: number = 0;
  modalState = {
    isOpen: false,
    type: ModalType.DELETE
  }
  private token: string = '';
  private userToDelete: User | null = null;


  @ViewChild(UserEditorComponent) userEditor!: UserEditorComponent;

  setOpenEditor(value: boolean) {
    this.isEditorOpen = value;
  }

  submitUser(userData: EditorUser) {
    const user: Partial<User> = {
      name: userData.name,
      paternalSurname: userData.lastName,
      maternalSurname: userData.secondLastName,
      email: userData.email,
      phone: userData.phone,
      role: userData.type,
      notes: userData.notes
    }

    const sub = this.isEditing && this.editingUserId
      ? this.usersService.updateUser(this.token, this.editingUserId, user)
      : this.usersService.addUser(this.token, user);

    const suscription = sub.subscribe({
      next: (usr) => {
        console.log(this.isEditing ? 'Usuario editado' : 'Usuario creado', usr);
        this.userEditor.error = false;
        this.userEditor.sent = true;
        this.isEditing = false;
        this.editingUserId = null;
        this.loadTableUsers();
        this.searchUsers(this.searchValue);
      },
      error: (err) => {
        console.error('Error al guardar el usuario:', err);
        this.userEditor.error = true;
        this.userEditor.sent = true;
      }
    });

    this.destroyRef.onDestroy(() => suscription.unsubscribe());
  }

  deleteUser(user: User) {
    this.userToDelete = user;
    this.openModal(ModalType.DELETE);
  }

  editUser(user: User) {
    this.editingUserId = user.id!;
    this.isEditing = true;
    this.userEditor.editUser(user);
    this.setOpenEditor(true);
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
      const suscription = this.usersService.deleteUser(this.token, this.userToDelete!.id!).subscribe({
        next: () => {
          console.log('Usuario eliminado con exito:', this.userToDelete);
          this.loadTableUsers();
          this.searchUsers(this.searchValue);
        },
        error: (err) => {
          console.error('Error al eliminar el usuario:', err);
        }
      });
      this.destroyRef.onDestroy(() => suscription.unsubscribe());
    }

    this.modalState.isOpen = false;
  }

  //Service integration
  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.loadTableUsers();
  }

  private loadTableUsers(page: number = 0) {
    const suscription = this.usersService.getUsers(this.token, page).subscribe({
      next: (data) => {
        this.users = data.content;
        this.totalPages = data.totalPages;
        console.log('Usuarios:', data);
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
    this.destroyRef.onDestroy(() => suscription.unsubscribe());
  }

  searchUsers(value: string, page: number = 0): void {
    this.searchValue = value;
    const suscription = this.usersService.searchUsers(this.token, value, page).subscribe({
      next: (data) => {
        this.searchedUsers = data.content;
        this.totalPagesSearched = data.totalPages;
        console.log('Usuarios filtrados:', data);
      },
      error: (err) => {
        console.error('Error al buscar usuarios:', err);
      }
    });
    this.destroyRef.onDestroy(() => suscription.unsubscribe());
  }

  onTablePageChange(page: number): void {
    this.loadTableUsers(page);
  }

  onTablePageChangeSearched(page: number): void {
    this.searchUsers(this.searchValue, page);
  }

}
