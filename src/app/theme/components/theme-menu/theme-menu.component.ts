import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ThemeService } from '../../../theme/theme.service';

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
export class ThemeMenuComponent implements OnInit {
  themeService = inject(ThemeService);

  lightTheme = "light-theme";
  darkTheme = "dark-theme";

  currentTheme = "";

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
  }

  themeButtonOnClick(theme: string) {
    this.themeService.setCurrenTheme(theme);
    this.currentTheme = this.themeService.currentTheme;
  }
}
