import { Component, inject, signal } from '@angular/core';
import { Validators, FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    RouterLink,
    MatCheckbox
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router)
  private authService = inject(AuthService);

  email =  new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(30)]);

  form = new FormGroup({
    email:  this.email,
    password:  this.password,
  });

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public async onSubmit() {
    if(this.email.value && this.password.value){
      this.authService.login({email: this.email.value, password: this.password.value })
      if(this.authService.isloggedIn) {
        this.router.navigateByUrl("/home");
      }
    }
  }
}
