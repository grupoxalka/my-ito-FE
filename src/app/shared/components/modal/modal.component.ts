import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MODAL_CONTENT } from '../../../const/const';
import { ModalType } from '../../../enums/ModalType';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() type: ModalType = ModalType.DELETE;
  @Input() isOpen: boolean = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onConfirm = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }

  confirm() {
    this.onConfirm.emit();
  }

  get modalType() {
    return MODAL_CONTENT.find(modal => modal.type === this.type);
  }

  get icon(): string {
    return this.modalType?.icon || '';
  }

  get title(): string {
    return this.modalType?.title || '';
  }

  get actionButton(): string {
    return this.modalType?.confirmButton || ''
  }

  get closeButton(): string {
    return this.modalType?.closeButton || ''
  }

  get actionBG(): boolean {
    return this.modalType?.redBG || false;
  }

  get altIcon(): string {
    return this.modalType?.altIcon || '';
  }
  
}