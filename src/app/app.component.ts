import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ThemeService } from './theme/theme.service';
import { AuthService } from './authentication/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = "RandomApp";

  private themeService = inject(ThemeService);
  private authService = inject(AuthService);

  async ngOnInit() {
    console.log("Initializing application...");
    await this.authService.loadUser();
    this.themeService.loadTheme();
  }
}

