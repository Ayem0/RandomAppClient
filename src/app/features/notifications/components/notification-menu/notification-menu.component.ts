import { Component, ViewChild } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-notification-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatBadge,
    MatTooltip,
    MatMenuModule,
    MatTabsModule
  ],
  templateUrl: './notification-menu.component.html',
  styleUrl: './notification-menu.component.css'
})
export class NotificationMenuComponent {
  @ViewChild(MatMenuTrigger) navigationAction!: MatMenuTrigger;
}
