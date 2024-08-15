import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { SettingsMenuComponent } from "./components/settings-menu/settings-menu.component";
import { MessageMenuComponent } from '../messaging/components/message-menu/message-menu.component';
import { NotificationMenuComponent } from '../notifications/components/notification-menu/notification-menu.component';
import { AuthService } from '../authentication/services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar,
    MatDivider,
    // components
    AccountMenuComponent,
    NavigationMenuComponent,
    SettingsMenuComponent,
    MessageMenuComponent,
    NotificationMenuComponent,
    AsyncPipe
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  public isLoggedIn = this.authService.$isLoggedIn;
  
}
