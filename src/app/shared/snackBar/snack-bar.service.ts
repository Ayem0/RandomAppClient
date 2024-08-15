import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private readonly snackBar = inject(MatSnackBar);

  openSnackBar(message: string[],  duration: number, action?: string,) {
    this.snackBar.open(message.join(" "), action, { duration: duration * 1000 });
    // TODO openFromComponent pour faire des customs component pour la snackbar
  }
}
