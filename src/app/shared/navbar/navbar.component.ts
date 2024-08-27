import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatToolbar} from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../authentication/services/auth.service';
import { MessageMenuComponent } from '../../features/messaging/components/message-menu/message-menu.component';
import { NotificationMenuComponent } from '../../features/notifications/components/notification-menu/notification-menu.component';
import { AccountMenuComponent } from './components/account-menu/account-menu.component';
import { NavigationMenuComponent } from './components/navigation-menu/navigation-menu.component';
import { SettingsMenuComponent } from './components/settings-menu/settings-menu.component';
import { MessageSidenavComponent } from "../../features/messaging/components/message-sidenav/message-sidenav.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormField } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { SidenavService } from '../sidenav/services/sidenav.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar,
    MatDivider,
    AccountMenuComponent,
    NavigationMenuComponent,
    SettingsMenuComponent,
    MessageMenuComponent,
    NotificationMenuComponent,
    AsyncPipe,
    MessageSidenavComponent,
    MatButtonModule,
    MatIcon,
    MatTabsModule,
    MatSidenavModule,
    MatFormField,
    ReactiveFormsModule
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly sidenavService = inject(SidenavService);

  public isLoggedIn = this.authService.$isLoggedIn;


  
  public openMessage() {
    this.sidenavService.toggleRightSidenav();
    this.sidenavService.loadRightSidenavComponent(MessageSidenavComponent);
  }

  public openNavigation() {
    this.sidenavService.toggleLeftSidenav();
    this.sidenavService.loadLeftSidenavComponent(NavigationMenuComponent);
  }

  
}
