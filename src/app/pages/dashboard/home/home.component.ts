import { Component } from '@angular/core';
import { DashboardSectionComponent } from '../../../shared/components/dashboard-section/dashboard-section.component';
import { OwlCardsComponent } from './owl-cards/owl-cards.component';
import { ToolCardsComponent } from '../../../shared/components/tool-cards/tool-cards.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
@Component({
  selector: 'app-home',
  imports: [DashboardSectionComponent,
    OwlCardsComponent,
    ToolCardsComponent,
    ModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
