import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SnackBarService } from '../../../shared/components/snackBar/snack-bar.service';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterLink,
    MatCardModule,
    MatProgressSpinner,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBarService = inject(SnackBarService);

  /** Formulaire */
  email =  new FormControl('', [Validators.required, Validators.email]);
  form = new FormGroup({
    email: this.email
  });

  /** Messages d'erreur apres requete de forgotPassword */
  errorMessages: string[] = [];
  /** Pour le spinner */
  isLoading = false;

  /** Si success affiche un contenu différent */
  forgotPasswordSuccessful = false;

  public onSubmit() {
    this.isLoading = true;

    if (this.form.valid && this.email.value ) {
      this.authService.forgotPassword({ email: this.email.value }).subscribe({
        next: (res) => {
          if (res.isSuccess && res.isSuccess === true) {
            this.forgotPasswordSuccessful = true;
            this.isLoading = false;
          } else {
            this.errorMessages = res.errors ? res.errors : ['An unexpected error occurred.'];
            this.snackBarService.openSnackBar(this.errorMessages, 3);
            this.isLoading = false;
          }
        }
      });
    }
  }
}
