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

  @Input() counters: { [key: string]: number } = Object.fromEntries(
    USER_TYPES.map(type => [type.KEY, type.COUNTER])
  );

  labels: { [key: string]: string } = Object.fromEntries(
    USER_TYPES.map(type => [type.KEY, type.LABEL])
  );

  get userLabel(): string {
    return this.labels[this.user] || this.user;
  }

  get counter(): number {
    return this.counters[this.user] ?? 0;
  }

  get altText(): string {
    const label = this.labels[this.user] || '';

    const base = label.endsWith('res') ? label.slice(0, -2) : label.slice(0, -1);
    return `Búho ${base}`;
  }
}

