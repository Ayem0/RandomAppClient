import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-confirm-email',
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
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  
  private email: string | null = null;
  private token: string | null = null;

  confirmEmailSuccessful = false;
  isLoading = true;

  resentEmail = false;
  resendConfirmEmailSuccessful = false;
  resendingEmail = false;

  confirmEmailErrorMessages: string[] = [];

  resendEmailErrorMessages: string[] = [];



  ngOnInit(): void {
    this.route.queryParamMap.subscribe( params => {
      this.email =  params.get("Email");
      this.token =  params.get("Token");
    })
    console.log(this.token);

    if (!this.email || !this.token) {
      this.router.navigateByUrl("login");
      return;
    }

    this.confirmEmail();
  }

  /** Fais la requete de Register, isLoading est true le temps de la requete */
  public confirmEmail() {
    if (this.email && this.token) {
      this.authService.confirmEmail({ email: this.email, token: this.token }).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.confirmEmailSuccessful = true;
          } else {
            this.confirmEmailErrorMessages = res.errors ? res.errors : ['An unexpected error occurred'];
          }
          this.isLoading = false;
        }
      });
    }
  }

  public resendEmail() {
    this.resentEmail = true;
    this.resendingEmail = true;
    if (this.email ) {
      this.authService.resendConfirmEmail({ email: this.email }).subscribe({
        next: (res) => {
          if (res.isSuccess) {
            this.resendConfirmEmailSuccessful = true;
          } else {
            this.resendEmailErrorMessages = res.errors ? res.errors : ['An unexpected error occurred'];
          }
          this.resendingEmail = false;
        }
      });
    }
  }
}
