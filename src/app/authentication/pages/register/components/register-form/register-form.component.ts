import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { FormValidatorDirective } from '../../../../../shared/directives/form-validator/form-validator.directive';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../services/auth.service';
import { SnackBarService } from '../../../../../shared/snackBar/snack-bar.service';

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
    MatCardModule,
    MatProgressSpinner,
  ],
  providers: [
   FormValidatorDirective,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  private readonly authService = inject(AuthService);
  private readonly validator = inject(FormValidatorDirective);
  private readonly snackBarService = inject(SnackBarService);

  @Input() registrationSuccessful = false;
  @Output() registrationSuccessfulChange = new EventEmitter<boolean>();

  /** Formulaire */
  username =  new FormControl('', [
    Validators.required, 
    Validators.minLength(3), 
    Validators.maxLength(30), 
    this.validator.onlyLettersOrNumbers(),
  ]);
  email =  new FormControl('', [Validators.required, Validators.email]);
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
  confirmPassword = new FormControl('', [
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
    username: this.username,
    email:  this.email,
    password:  this.password,
    confirmPassword:  this.confirmPassword,
  }, { validators: this.validator.passwordsMatch()});

  /** Signal pour la value de la visibilité du password */
  hide = signal(true);

  /** Pour le spinner et disable le button */
  isLoading = false;

  /** Tableau de message d'erreur */
  errorMessages: string[] = [];

  /** Affiche ou cache le mot de passe */
  togglePassword(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  /** Fais la requete de Register, isLoading est true le temps de la requete */
  public onSubmit() {
    this.isLoading = true;

    if (this.form.valid && this.username.value && this.email.value && this.password.value && this.confirmPassword.value) {
      this.authService.register({
        username: this.username.value,
        email: this.email.value,
        password: this.password.value,
        confirmPassword: this.confirmPassword.value
      }).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.registrationSuccessful = true;
            this.registrationSuccessfulChange.emit(this.registrationSuccessful);
          } else {
            this.errorMessages = res.errors ? res.errors : ['An unexpected error occurred'];
            this.snackBarService.openSnackBar(this.errorMessages, 2);
          }
        },
        error: (err) => {
          console.log(err);
          this.errorMessages = ['An unexpected error occurred'];
          this.snackBarService.openSnackBar(this.errorMessages, 2);
        }
      });
    }

    this.isLoading = false;
  }
}