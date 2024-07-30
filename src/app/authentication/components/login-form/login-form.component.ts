import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { MatCardModule } from '@angular/material/card';
import { LoginResponse } from '../../interfaces/auth-response';
import { LoginRequest } from '../../interfaces/auth-request';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

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
    MatProgressSpinner
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  private router = inject(Router)
  private authService = inject(AuthService);
  /** Signal pour toggle le hide password */
  hide = signal(true);
  /** Formulaire */
  email =  new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]);
  form = new FormGroup({
    email:  this.email,
    password:  this.password,
  });

  /** Message d'erreurs à afficher */
  errorMessages: string[] = [];
  /** Pour le spinner */
  isLoading = false;



  public hidePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public onSubmit() {
    if (this.form.valid && this.email.value && this.password.value) {
      this.isLoading = true;
      const loginRequest: LoginRequest = {
        email: this.email.value,
        password: this.password.value,
      };

      this.authService.login(loginRequest).subscribe({
        next: (res: Partial<LoginResponse>) => {
          if (!res.isSuccess) {
            this.errorMessages = res.errors || ['Unknown error'];
          }
          this.isLoading = false;
        },
        error: () => {
          this.errorMessages = ['An unexpected error occurred'];
          this.isLoading = false;
        }
      });
    }
  }
}
