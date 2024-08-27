import { MatSidenav } from '@angular/material/sidenav';
import { SidenavItem } from '../models/sidenav.const';
import { MessageSidenavComponent } from '../../../features/messaging/components/message-sidenav/message-sidenav.component';
import { Injectable, Type, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private leftSidenav: MatSidenav | null = null;
  private rightSidenav: MatSidenav | null = null;

  private leftSidenavContent: ViewContainerRef | null = null;
  private rightSidenavContent: ViewContainerRef | null = null;

  public rightSidenavItems: SidenavItem[] = [{ name: "messageSidenav", component: MessageSidenavComponent}];
  public leftSidenavItems: SidenavItem[] = [{ name: "messageSidenav", component: MessageSidenavComponent}];

  public setLeftSidenav(sidenav: MatSidenav) {
    console.log(sidenav);
    this.leftSidenav = sidenav;
  }

  public setRightSidenav(sidenav: MatSidenav) {
    console.log(sidenav);
    this.rightSidenav = sidenav;
  }

  public setLeftSidenavRef(template: ViewContainerRef) {
    this.leftSidenavContent = template;
  }

  public setRightSidenavRef(template: ViewContainerRef) {
    this.rightSidenavContent = template;
  }

  public toggleRightSidenav() {
    if(this.rightSidenav){
      console.log("toggle RIGHT");
      this.rightSidenav.toggle();
    }
  }

  public toggleLeftSidenav() {
    console.log("toggle LEFT");
    if(this.leftSidenav){
      this.leftSidenav.toggle();
    }
  }

  // Method to load a component into the left sidenav
  public loadLeftSidenavComponent(component: Type<unknown>) {
    if (this.leftSidenavContent) {
      this.leftSidenavContent.clear();
      this.leftSidenavContent.createComponent(component);
      console.log("COMPOSANT CREE");
    }
  }

  // Method to load a component into the right sidenav
  public loadRightSidenavComponent(component: Type<unknown>) {
    if (this.rightSidenavContent) {
      this.rightSidenavContent.clear();
      this.rightSidenavContent.createComponent(component);
      console.log("COMPOSANT CREE");
    }
  }



}
