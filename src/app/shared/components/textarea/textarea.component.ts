import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css']
})
export class TextareaComponent {
<<<<<<< HEAD
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() model: string = ''; // Propiedad para [(ngModel)]
  @Input() rows: number = 4;
  @Input() disabled: boolean = false;
  @Input() maxLength: number = 320;
  @Input() placeholder: string = 'Escribe aquí...';

  @Output() modelChange: EventEmitter<string> = new EventEmitter<string>();

  onModelChange(value: string): void {
    this.model = value;
    this.modelChange.emit(value); // Emitir el cambio
  }
}
=======
  @Input() label = '';
  @Input() name = '';
  @Input() rows = 5;
  @Input() model = '';
}
>>>>>>> main
