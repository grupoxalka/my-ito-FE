import { Component, DestroyRef, inject } from '@angular/core';
import { InputComponent } from "../../../shared/components/input/input.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(controlName1)?.value;
    const value2 = control.get(controlName2)?.value;

    if (value1 === value2) {
      return null; //the control is valid
    }
    return { valuesNotEqual: true };
  }
}

@Component({
  selector: 'app-create-password',
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './create-password.component.html',
  styleUrl: './create-password.component.css'
})
export class CreatePasswordComponent {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  passwordCreated: boolean = false;
  passworNotMatch: boolean = false;
  form = new FormGroup({
    newPassword: new FormControl('', [Validators.required]),
    confirmedPassword: new FormControl('', [Validators.required])
  },
  {
    validators: [equalValues('newPassword', 'confirmedPassword')]
  }
  );

  submitForm() : void{
    if (this.form.invalid) {
      if (this.form.errors?.['valuesNotEqual']) this.passworNotMatch = true;
      this.form.markAllAsTouched();
      return;
    }
    this.forgotPassword();
  }

  forgotPassword() : void {
    const data = {
      email: localStorage.getItem('recoveryEmail'),
      newPassword: this.form.value.newPassword,
      confirmedPassword: this.form.value.confirmedPassword
    }

    const suscription = this.authService.forgotPassword(data).subscribe({
      next: (response) => {
        console.log("Password created successfully", response);
        this.passwordCreated = true;
      },
      error: (error) => {
        console.error("Error creating password", error, data);
      },
    });

    this.destroyRef.onDestroy(() => suscription.unsubscribe());
  }
}
