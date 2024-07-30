import { Component } from '@angular/core';
import { ConfirmEmailFormComponent } from '../../components/confirm-email-form/confirm-email-form.component';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [
    ConfirmEmailFormComponent
  ],
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.css'
})
export class ConfirmEmailComponent {

}
