import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { NavbarIconComponent } from "../../shared/components/navbar-icon/navbar-icon.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, NgClass, NavbarIconComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isOpen: boolean = false;
  currentActiveLink: string = '';
  navItems = [
    { link: 'home', icon: 'dashboard', text: 'Tablero' },
    { link: 'users', icon: 'user', text: 'Gestor de usuarios' },
    { link: 'announcements', icon: 'notification', text: 'Anuncios' },
    { link: 'reports', icon: 'report', text: 'Gestor de reportes' },
  ];
  constructor(public router: Router) { }
  ngOnInit(): void {
    this.setCurrentActive();
  }
  openMenu() {
    this.isOpen = true;
    document.body.classList.add('overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  closeMenu() {
    this.isOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  setCurrentActive() {
    this.currentActiveLink = this.router.url.split('/').pop() || '';
  }
  currentActive(link: string): boolean {
    this.setCurrentActive();
    return this.currentActiveLink === link;
  }

}
