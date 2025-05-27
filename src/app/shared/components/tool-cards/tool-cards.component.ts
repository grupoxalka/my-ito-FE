import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LAST_TOOLS } from '../../../const/const';

@Component({
  selector: 'app-tool-cards',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tool-cards.component.html',
  styleUrl: './tool-cards.component.css'
})
export class ToolCardsComponent {
  @Input() alone: boolean = false;
  @Input() button: number = NaN;

  get tool() {
    return LAST_TOOLS.find(tool => tool.KEY === this.button);
  }

  get title() {
    return this.tool?.TITLE ?? '';
  }

  get subtitle() {
    return this.tool?.SUBTITLE ?? '';
  }

  get path() {
    return this.tool?.PATH ?? '';
  }
}
