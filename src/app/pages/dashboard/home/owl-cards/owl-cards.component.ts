import { Component, Input } from '@angular/core';
import { USER_TYPES } from '../../../../const/const';

@Component({
  selector: 'app-owl-cards',
  imports: [],
  templateUrl: './owl-cards.component.html',
  styleUrl: './owl-cards.component.css'
})

export class OwlCardsComponent {
  @Input() user: string = '';

  get userType() {
    return USER_TYPES.find(type => type.KEY === this.user);
  }

  get label(): string {
    return this.userType?.LABEL || this.user;
  }

  get counter(): number {
    return this.userType?.COUNTER ?? 0;
  }

  get altText(): string {
    const label = this.userType?.LABEL || '';
    const occupation = label.endsWith('res') ? label.slice(0, -2) : label.slice(0, -1);
    return `Búho ${occupation}`;
  }
}

