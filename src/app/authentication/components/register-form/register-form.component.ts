import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    MatCardModule
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  private router = inject(Router)
  private authService = inject(AuthService);

  username =  new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9]+$")]);
  email =  new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]);
  confirmPassword = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]);

  form = new FormGroup({
    username: this.username,
    email:  this.email,
    password:  this.password,
    confirmPassword:  this.confirmPassword,
  });

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public async onSubmit() {
    if(this.username.value && this.email.value && this.password.value && this.confirmPassword.value ){
      try {
        this.authService.register({ username: this.username.value, email: this.email.value, password: this.password.value, confirmPassword: this.confirmPassword.value })
      } catch (error) {
        console.log(error)
      }
    }
  }
}