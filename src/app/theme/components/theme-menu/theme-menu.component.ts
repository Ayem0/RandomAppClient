import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../../theme/theme.service';
import { ThemeOptions } from '../../consts/theme-consts';

@Component({
  selector: 'app-theme-menu',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatMenuModule,
  ],
  templateUrl: './theme-menu.component.html',
  styleUrl: './theme-menu.component.css'
})
export class ThemeMenuComponent {
  private themeService = inject(ThemeService);

  light = ThemeOptions.LIGHT;
  dark = ThemeOptions.DARK;

  themeButtonOnClick(themeOptions: ThemeOptions) {
    this.themeService.setCurrenTheme(themeOptions);
  }
}
