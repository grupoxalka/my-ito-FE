import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../shared/components/input/input.component";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery-password',
  imports: [RouterLink, InputComponent, ButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.css'
})
export class RecoveryPasswordComponent {
  router = inject(Router);
  formSubmitted : boolean = false;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  submitForm(){
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log("Form is invalid", this.form.value);
      return;
    }
    this.formSubmitted = true;
    this.sendEmail();
  }

  // This method simulates sending an email for password recovery
  sendEmail(){
    const email = this.form.value.email;
    localStorage.setItem('recoveryEmail', email!);
    console.log("Email sent to: ", email);
    
    this.router.navigate(['/create-password']);
  }
}
