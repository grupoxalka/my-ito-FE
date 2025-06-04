import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html'
})
export class TextareaComponent {
  @Input() label = '';
  @Input() name = '';
  @Input() rows = 5;
  @Input() model = '';
}
