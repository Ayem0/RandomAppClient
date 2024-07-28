import { Component } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-message-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatBadge,
    MatTooltip,
  ],
  templateUrl: './message-menu.component.html',
  styleUrl: './message-menu.component.css'
})
export class MessageMenuComponent {

}
