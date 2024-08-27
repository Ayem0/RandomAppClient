import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeMenuComponent } from '../../../../features/theme/components/theme-menu/theme-menu.component';


@Component({
  selector: 'app-settings-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    // components
    ThemeMenuComponent
  ],
  templateUrl: './settings-menu.component.html',
  styleUrl: './settings-menu.component.css'
})

export class SettingsMenuComponent {

}
