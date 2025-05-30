import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './select.component.html'
})
export class SelectComponent {
  @Input() label!: string;
  @Input() placeholder = 'Seleccione una opción';
  @Input() options: { value: string; label: string }[] = [];
  @Input() model!: string;
}