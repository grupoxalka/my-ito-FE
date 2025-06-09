import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonText: string = "";
  @Input() isDisabled: boolean = false;
  @Input() iconSrc?: string;
  @Input() buttonType: 'submit' |'button' = 'button';
  @Input() color: 'green' | 'red' | 'blue' = 'blue';
  @Output() onClick = new EventEmitter<void>(); 
}

