import { Component, inject, OnInit } from '@angular/core';
import { MatBadge } from '@angular/material/badge';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbar} from '@angular/material/toolbar';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../theme.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatToolbar,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
    MatDivider,
    MatBadge,
    MatTooltip
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
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
