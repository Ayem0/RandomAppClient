import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log("ici");

  let canActivate = false;
  authService.isAuthenticated$.subscribe(value => {
    if (value === false) {
      router.navigate(['/login']);
    } 
    canActivate = value;
  });
  return canActivate;
}

  // return authService.isAuthenticated$.pipe(
  //   tap(isAuthenticated => {
  //     if (isAuthenticated) {
  //       console.log("icisss");
  //       return of(true);
  //     } else {
  //       console.log("icisssaaaaaaa");
  //       return authService.loadUser().pipe(
  //         tap(v => {
  //           if (v) {
  //             console.log("icisssaaaaaasssssa");
  //             return true
  //           } else {
  //             console.log("icisssaaaaaa     fg bsgfkjgba");
  //             router.navigateByUrl('/login');
  //             return false
  //           }
  //         }),
  //         catchError(() => {
  //           console.log("icisssaaaaaasqsqsqsq     fg bsgfkjgba");
  //           router.navigateByUrl('/login');
  //           return of(false);
  //         })
  //       );
  //     }
  //   })
  // );


