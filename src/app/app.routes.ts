import { Routes } from '@angular/router';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { AnnouncementsComponent } from './pages/dashboard/announcements/announcements.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    {
        path: 'dashboard', component: DashboardComponent,
        children:
            [
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: HomeComponent, title: 'dashboard' }, // Tu componente principal
                { path: 'users', component: UsersComponent, title: 'users' },
                { path: 'announcements', component: AnnouncementsComponent, title: 'announcements' },
            ]
    },
    { path: '**', redirectTo: 'login' }
];
