import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const loggedInGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if(!authService.isLoggedIn()) {
    return true;
  } else {
    router.navigateByUrl("/home");
    return false;
  }
};
