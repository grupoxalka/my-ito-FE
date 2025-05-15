import { Component } from '@angular/core';
import { FormsModule, NgForm  } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { InputComponent } from '../../shared/components/input/input.component';
import { ButtonComponent } from '../../shared/components/button/button.component';

interface LoginModel {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, InputComponent, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: LoginModel = {
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.router.navigate(['/home']);
    }
  }
}
