import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { catchError, of, switchMap } from 'rxjs';

export const loggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("laaa");

  let canActivate = false;
  authService.isAuthenticated$.subscribe(value => {
    if (value === true) {
      router.navigate(['/home']);
    }
    canActivate = !value;
    
  });
  return canActivate;
}

