import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../authentication/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    MatDivider,
  ],
  templateUrl: './account-menu.component.html',
  styleUrl: './account-menu.component.css'
})

export class AccountMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  signOut() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

}
