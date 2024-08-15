import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../authentication/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent {
  private readonly authService = inject(AuthService);

  public isLoggedIn = this.authService.$isLoggedIn;

}
