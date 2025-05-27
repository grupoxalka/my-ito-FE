import { Component } from '@angular/core';
import { TableAnnouncementsComponent } from '../../../shared/components/table-announcements/table-announcements.component';
import { TableUsersComponent } from "../../../shared/components/table-users/table-users.component";

@Component({
  selector: 'app-announcements',
  imports: [TableAnnouncementsComponent, TableUsersComponent],
  templateUrl: './announcements.component.html',
  styleUrl: './announcements.component.css'
})
export class AnnouncementsComponent {


}
