import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tool-cards',
  imports: [NgClass],
  templateUrl: './tool-cards.component.html',
  styleUrl: './tool-cards.component.css'
})
export class ToolCardsComponent {
  @Input() alone: boolean = false;
}
