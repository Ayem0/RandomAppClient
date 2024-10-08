import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { FormValidatorDirective } from '../../../shared/directives/form-validator/form-validator.directive';
import { SnackBarService } from '../../../shared/components/snackBar/snack-bar.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
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
  providers: [
    FormValidatorDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly validator = inject(FormValidatorDirective);
  private readonly router = inject(Router);
  private readonly snackBarService = inject(SnackBarService);

  /** Formulaire et form control */
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(100),
    this.validator.hasLower(),
    this.validator.hasUpper(),
    this.validator.hasNumber(),
    this.validator.notOnlyLettersOrNumbers(),
    this.validator.hasSpace(),
  ]);

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  /** Messages d'erreur apres requete de connexion */
  errorMessages: string[] = [];
  /** Pour le spinner */
  isLoading = false;

  /** Signal pour toggle le hide password */
  hide = signal(true);

  /** Affiche ou cache le mot de passe */
  public togglePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  /** Fais la requete de login, lance le spinner et disable le button */
  public onSubmit() {
    this.isLoading = true;

    if (this.form.valid && this.email.value && this.password.value) {
      this.authService.login({ email: this.email.value, password: this.password.value, }).subscribe({
        next: (res) => {
          if (res.isSuccess && res.isSuccess === true) {
            this.router.navigateByUrl("/home");
            this.isLoading = false;
          } else {
            if (res.errors?.includes('Account is not confirmed')) {
              console.log("TODO");
            }
            this.errorMessages = res.errors ? res.errors : ['An unexpected error occurred'];
            this.snackBarService.openSnackBar(this.errorMessages, 3);
            this.isLoading = false;
          }
        }
      });
    }
  }
}