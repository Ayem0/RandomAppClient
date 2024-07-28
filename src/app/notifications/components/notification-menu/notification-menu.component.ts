import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-notification-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatBadge,
    MatTooltip,
  ],
  templateUrl: './notification-menu.component.html',
  styleUrl: './notification-menu.component.css'
})
export class NotificationMenuComponent {

}
