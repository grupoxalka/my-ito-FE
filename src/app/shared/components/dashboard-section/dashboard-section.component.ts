import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-section',
  imports: [],
  templateUrl: './dashboard-section.component.html',
  styleUrl: './dashboard-section.component.css'
})
export class DashboardSectionComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() description: string = '';
}
