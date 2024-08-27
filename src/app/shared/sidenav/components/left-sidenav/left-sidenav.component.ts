import { AfterViewInit, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { NavigationMenuComponent } from '../../../navbar/components/navigation-menu/navigation-menu.component';

@Component({
  selector: 'app-left-sidenav',
  standalone: true,
  imports: [
    NavigationMenuComponent
  ],
  templateUrl: './left-sidenav.component.html',
  styleUrl: './left-sidenav.component.css'
})
export class LeftSidenavComponent implements AfterViewInit {
  @ViewChild('leftSidenavContent', { read: ViewContainerRef }) leftSidenavContent!: ViewContainerRef;

  private readonly sidenavService = inject(SidenavService);

  ngAfterViewInit(): void {
    this.sidenavService.setLeftSidenavRef(this.leftSidenavContent);
  }
}


