import { AfterViewInit, Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { MessageSidenavComponent } from '../../../../features/messaging/components/message-sidenav/message-sidenav.component';

@Component({
  selector: 'app-right-sidenav',
  standalone: true,
  imports: [
    MessageSidenavComponent
  ],
  templateUrl: './right-sidenav.component.html',
  styleUrl: './right-sidenav.component.css'
})
export class RightSidenavComponent implements AfterViewInit {

  @ViewChild('rightSidenavContent', { read: ViewContainerRef }) rightSidenavContent!: ViewContainerRef;

  private readonly sidenavService = inject(SidenavService);

  ngAfterViewInit(): void {
    this.sidenavService.setRightSidenavRef(this.rightSidenavContent);
  }

}
