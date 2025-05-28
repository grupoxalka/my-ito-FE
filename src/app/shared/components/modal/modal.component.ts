import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MODAL_CONTENT } from '../../../const/const';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() type: number = NaN;

  get modalType() {
    return MODAL_CONTENT.find(type => type.ID === this.type);
  }

  get icon(): string {
    return this.modalType?.ICON || '';
  }

  get title(): string {
    return this.modalType?.TITLE || '';
  }

  get actionButton(): string {
    return this.modalType?.ACTION_BUTTON || ''
  }

  get closeButton(): string {
    return this.modalType?.CLOSE_BUTTON || ''
  }

  get actionBG(): boolean {
    return this.modalType?.RED_BG || false;
  }

  get altIcon(): string {
    return this.modalType?.ALT_ICON || '';
  }
}
