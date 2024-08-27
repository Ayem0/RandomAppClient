import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatBadge } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-message-menu',
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
    ReactiveFormsModule
  ],
  templateUrl: './message-menu.component.html',
  styleUrl: './message-menu.component.css'
})
export class MessageMenuComponent {

  public search = new FormControl('');

  /**
   *
   */
  constructor() {
    this.search.valueChanges.pipe(debounceTime(200)).subscribe(() => console.log("Hello"));
    
  }

}
