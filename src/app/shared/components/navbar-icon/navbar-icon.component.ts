import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-icon',
  imports: [RouterLink, NgClass],
  templateUrl: './navbar-icon.component.html',
  styleUrl: './navbar-icon.component.css'
})
export class NavbarIconComponent {
  @Input() icon: string = '';
  @Input() text: string = '';
  @Input() isActive: boolean = false;
  @Input() link: string = '';
}
