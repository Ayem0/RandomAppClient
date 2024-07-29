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
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private router = inject(Router)
  private authService = inject(AuthService);

  hide = signal(true);

  email =  new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]);

  form = new FormGroup({
    email:  this.email,
    password:  this.password,
  });

  errorMessages: string[] = [];



  hidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public async onSubmit() {
    if(this.email.value && this.password.value){
      this.authService.login({email: this.email.value, password: this.password.value });
    }
  }
}
