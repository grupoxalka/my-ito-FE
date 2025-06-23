import { Component } from '@angular/core';
import { ReactiveFormsModule,FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { AuthService } from '../../services/auth.service'; 

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService 
  ) {
  this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });
 }

    onSubmit() {
    if (this.form.invalid) return; 

    const loginData = this.form.value;

    this.authService.login(loginData).subscribe({
      next: () => {
        console.log('Login successful');
        this.router.navigate(['/dashboard/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
    }
  }
