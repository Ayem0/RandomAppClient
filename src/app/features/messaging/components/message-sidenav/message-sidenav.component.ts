import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-message-sidenav',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatBadge,
    MatTooltip,
    MatTabsModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule
  ],
  templateUrl: './message-sidenav.component.html',
  styleUrl: './message-sidenav.component.css'
})
export class MessageSidenavComponent {
  public search = new FormControl('');

  /**
   *
   */
  constructor() {
    this.search.valueChanges.pipe(debounceTime(200)).subscribe(() => console.log("Hello"));
    
  }
}
