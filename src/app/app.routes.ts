import { Routes } from '@angular/router';
import { HomeComponent } from './pages/dashboard/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { AnnouncementsComponent } from './pages/dashboard/announcements/announcements.component';
import { LoginComponent } from './pages/login/login.component';
import { RecoveryPasswordComponent} from './pages/recovery-password/recovery-password.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    {path: 'recovery-password',component: RecoveryPasswordComponent, title: 'Recovery Password'},
    {
    
        path: 'dashboard', component: DashboardComponent,
        children:
            [
                { path: '', redirectTo: 'home', pathMatch: 'full' },
                { path: 'home', component: HomeComponent, title: 'Home' },
                { path: 'users', component: UsersComponent, title: 'Users' },
                { path: 'announcements', component: AnnouncementsComponent, title: 'Announcements' },
            ]
    },
    { path: '**', redirectTo: 'Login' }
];
