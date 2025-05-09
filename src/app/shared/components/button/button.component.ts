import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input() buttonText: string = "";
  private _isDisabled: boolean = false;

  @Input()
  set isDisabled(value: string) {
    this._isDisabled = value === 'true';
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }
}
