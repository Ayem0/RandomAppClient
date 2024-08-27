import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormValidatorDirective } from '../../../../shared/directives/form-validator/form-validator.directive';
import { SnackBarService } from '../../../../shared/components/snackBar/snack-bar.service';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  
  
  private readonly authService = inject(AuthService);
  private readonly validator = inject(FormValidatorDirective);
  private readonly snackBarService = inject(SnackBarService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  /** Formulaire */
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
    password: this.password,
    confirmPassword: this.confirmPassword,
  }, { validators: this.validator.passwordsMatch() });


  resetPasswordSuccessful = false;
  private email: string | null = null;
  private token: string | null = null;

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

  ngOnInit(): void {
    this.route.queryParamMap.subscribe( params => {
      this.email =  params.get("Email");
      this.token =  params.get("Token");
    })
    console.log(this.token);

    if (!this.email || !this.token) {
      this.router.navigateByUrl("login");
    }
  }

  /** Fais la requete de Register, isLoading est true le temps de la requete */
  public onSubmit() {
    this.isLoading = true;

    if (this.form.valid && this.password.value && this.confirmPassword.value && this.email && this.token) {
      this.authService.resetPassword({
        email: this.email,
        token: this.token,
        password: this.password.value,
        confirmPassword: this.confirmPassword.value
      }).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.resetPasswordSuccessful = true;
          } else {
            this.errorMessages = res.errors ? res.errors : ['An unexpected error occurred'];
            this.snackBarService.openSnackBar(this.errorMessages, 3);
          }
          this.isLoading = false;
        }
      });
    }
  }
}
