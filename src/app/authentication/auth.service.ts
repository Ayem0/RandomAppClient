import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfirmEmailResponse, LoginResponse, RegisterResponse } from './interfaces/auth-response';
import { ConfirmEmailRequest, LoginRequest, RegisterRequest} from './interfaces/auth-request';
import { AccessTokenKey, RefreshTokenKey } from './consts/auth-const';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly authUrl = "https://localhost:7195/Auth";

  private isAuthenticated = false;
  isEmailConfirmed = false;

  private username = "";
  private userEmail = "";
  private accessTokenKey = AccessTokenKey;
  private refreshTokenKey = RefreshTokenKey;



  /** FONCTION POUR SE CONNECTER */
  public login(loginRequest: LoginRequest): Observable<Partial<LoginResponse>> {
    return this.http.post<LoginResponse>(`${this.authUrl}/Login`, loginRequest, { observe: 'response' }).pipe(
      map((res: HttpResponse<Partial<LoginResponse>>) => {
        if (res.status === 200 && res.body && res.body.accessToken && res.body.refreshToken) {
          this.userEmail = loginRequest.email;
          this.isAuthenticated = true;
          localStorage.setItem(this.accessTokenKey, res.body.accessToken);
          localStorage.setItem(this.refreshTokenKey, res.body.refreshToken);
          this.router.navigateByUrl('/home');
          return { success: true };
        } else {
          return { success: false, errors: res.body?.errors || ['Unknown error occurred'] };
        }
      }),
      catchError((error) => {
        let errorMsg = 'Login failed. Please try again.';
        if (error.error && error.error.errors) {
          errorMsg = error.error.errors;
        }
        return of({ success: false, errors: [errorMsg] });
      })
    );
  }

  // TODO A changer
  public register(registerRequest: RegisterRequest) {
    this.http.post<RegisterResponse>(`${this.authUrl}/Register`, registerRequest, {observe: "response"}).subscribe((res: HttpResponse<RegisterResponse>) => {
      if ( res.status == 200 ) {
        this.username = registerRequest.username;
        this.userEmail = registerRequest.email;
        this.isAuthenticated = true;
      } else {
        console.log("ici");
      }
    })
  }

  // TODO A changer
  public resendConfirmEmail(confirmEmailRequest: ConfirmEmailRequest) {
    return this.http.post<ConfirmEmailResponse>(`${this.authUrl}/ResendConfirmEmail`, confirmEmailRequest, {observe: "response"});
  }

  /** Fonction pour se deconnecter */
  public signOut() {
    localStorage.removeItem(AccessTokenKey);
    localStorage.removeItem(RefreshTokenKey);
    this.isAuthenticated = false;
    this.username = "";
    this.userEmail = "";
    this.router.navigateByUrl("/login");
  }

  /** Fonction pour savoir si l'utilisateur est connecté */
  public isLoggedIn() {
    return this.isAuthenticated;
  }

}
