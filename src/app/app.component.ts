import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ThemeService } from './features/theme/services/theme.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { SidenavService } from './shared/sidenav/services/sidenav.service';
import { LeftSidenavComponent } from './shared/sidenav/components/left-sidenav/left-sidenav.component';
import { RightSidenavComponent } from './shared/sidenav/components/right-sidenav/right-sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    MatSidenavModule,
    LeftSidenavComponent,
    RightSidenavComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('leftSidenav') public leftSidenav!: MatSidenav;
  @ViewChild('rightSidenav') public rightSidenav!: MatSidenav;
  

  title = "RandomApp";

  private readonly themeService = inject(ThemeService);
  private readonly sidenavService = inject(SidenavService);



  ngOnInit(): void {
    console.log("Initializing application...");
    this.themeService.loadTheme();

  }

  ngAfterViewInit(): void {
    this.sidenavService.setLeftSidenav(this.leftSidenav);
    this.sidenavService.setRightSidenav(this.rightSidenav);
  }
}

