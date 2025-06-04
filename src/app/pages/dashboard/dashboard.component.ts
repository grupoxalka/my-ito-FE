import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { NavbarIconComponent } from "../../shared/components/navbar-icon/navbar-icon.component";

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, RouterLink, NgClass, NavbarIconComponent, ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {

  isOpen: boolean = false;
  currentActivePath: string = '';
  backgroundImageURL: string = "bg-[url('/assets/dashboard-bg.svg')]";
  navItems = [
    { path: 'home', icon: 'dashboard', text: 'Tablero' },
    { path: 'users', icon: 'user', text: 'Gestor de usuarios' },
    { path: 'announcements', icon: 'notification', text: 'Anuncios' },
    { path: 'reports', icon: 'report', text: 'Gestor de reportes' },
  ];
  constructor(public router: Router) { }
  ngOnInit(): void {
    this.setCurrentActivePath();
  }

  openSidebarMenu() {
    this.isOpen = true;
    document.body.classList.add('overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  closeSidebarMenu() {
    this.isOpen = false;
    document.body.classList.remove('overflow-hidden');
  }

  setCurrentActivePath() {
    this.currentActivePath = this.router.url.split('/').pop() || '';
  }
  currentPath(path: string): boolean {
    this.setCurrentActivePath();
    return this.currentActivePath === path;
  }

}
