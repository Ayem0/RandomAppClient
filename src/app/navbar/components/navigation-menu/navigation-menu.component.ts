import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../authentication/auth.service';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    RouterLink
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent {
  authService = inject(AuthService);
}
