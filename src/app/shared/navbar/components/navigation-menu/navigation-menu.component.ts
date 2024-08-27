import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../authentication/services/auth.service';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SidenavService } from '../../../sidenav/services/sidenav.service';
import { MatList, MatListItem } from '@angular/material/list';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatList,
    RouterLink,
    MatListItem,
    AsyncPipe
  ],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent {
  private readonly authService = inject(AuthService);
  private readonly sidenavService = inject(SidenavService);

  public readonly isLoggedIn: Observable<boolean> = this.authService.$isLoggedIn;

  toggleLeftSidenav() {
    this.sidenavService.toggleLeftSidenav();
  }

}
