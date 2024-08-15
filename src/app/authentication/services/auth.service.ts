import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { AccessTokenKey, RefreshTokenKey } from '../consts/auth-const';
import { LoginRequest, RegisterRequest, ConfirmEmailRequest, RefreshRequest } from '../interfaces/auth-request';
import { LoginResponse, RegisterResponse, ConfirmEmailResponse, RefreshResponse, Response } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authUrl = "https://localhost:7195/Auth";

  private readonly accessTokenKey = AccessTokenKey;
  private readonly refreshTokenKey = RefreshTokenKey;

  private isLoggedIn = signal(false);
  public $isLoggedIn = this.isLoggedIn.asReadonly();

  /** Requete pour se connecter, si la connexion a fonctionné return true sinon return false et les erreurs */
  public login(loginRequest: LoginRequest): Observable<Partial<Response>> {
    return this.http.post<LoginResponse>(`${this.authUrl}/Login`, loginRequest, { observe: 'response' }).pipe(
      map((res: HttpResponse<Partial<LoginResponse>>) => {
        if (res.status === 200 && res.body && res.body.accessToken && res.body.refreshToken) {
          this.setAccessToken(res.body.accessToken);
          this.setRefreshToken(res.body.refreshToken);
          this.isLoggedIn.set(true);
          return { isSuccess: true };
        } else {
          this.isLoggedIn.set(false);
          return { isSuccess: false, errors: res.body && res.body.errors ? res.body.errors : ['Unknown error occurred'] };
        }
      }),
      catchError((err: HttpErrorResponse) => {
        this.isLoggedIn.set(false);
        return of({ isSuccess: false, errors: err.error.errors ? err.error.errors : ['Unknown error occurred']});
      })
    );
  }

  /** Requete pour s'inscrire, si l'inscription a fonctionné return true sinon return false et les erreurs */
  public register(registerRequest: RegisterRequest): Observable<Partial<RegisterResponse>>  {
    return this.http.post<RegisterResponse>(`${this.authUrl}/Register`, registerRequest, {observe: "response"}).pipe(
      map((res: HttpResponse<Partial<RegisterResponse>>) => {
        if ( res.status === 200 ) {
          return { isSuccess: true };
        } else {
          return { isSuccess: false, errors: res.body && res.body.errors ? res.body.errors : ['Unknown error occurred'] };
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return of({ isSuccess: false, errors: err.error.errors ? err.error.errors : ['Unknown error occurred']});
      })
    );
  }

  // TODO A changer
  public resendConfirmEmail(confirmEmailRequest: ConfirmEmailRequest) {
    return this.http.post<ConfirmEmailResponse>(`${this.authUrl}/ResendConfirmEmail`, confirmEmailRequest, {observe: "response"});
  }

  /** Remove access et refresh tokens du localstorage, met isLoggedIn a false */
  public logout() {
    localStorage.removeItem(AccessTokenKey);
    localStorage.removeItem(RefreshTokenKey);
    this.isLoggedIn.set(false);
  }

  /** Refresh les tokens avec le refreshtoken */
  public refresh(refreshRequest: RefreshRequest): Observable<Partial<RefreshResponse>> {
    return this.http.post<RefreshResponse>(`${this.authUrl}/Refresh`, refreshRequest, { observe: 'response' }).pipe(
      map((res: HttpResponse<Partial<RefreshResponse>>) => {
        if (res.status === 200 && res.body && res.body.accessToken && res.body.refreshToken) {
          this.setAccessToken(res.body.accessToken);
          this.setRefreshToken(res.body.refreshToken);
          return { isSuccess: true };
        } else {
          return { isSuccess: false, errors: res.body && res.body.errors ? res.body.errors : ['Unknown error occurred'] };
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return of({ isSuccess: false, errors: err.error.errors ? err.error.errors : ['Unknown error occurred']});
      })
    );
  }

  //  TODO - Tente de confirmer l'email
  public confirmEmail() {
    return;
  }

  /** Tente de récupérer l'accessToken du localStorage */
  private getAccessToken(): string | null {
    const accessToken = localStorage.getItem(this.accessTokenKey);
    return accessToken;
  }

  /** Tente de récupérer le refreshToken du localStorage */
  private getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem(this.refreshTokenKey);
    return refreshToken;
  }

  /** Met l'accessToken dans le localStorage */
  private setAccessToken(accessToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  /** Met le refreshToken dans le localStorage  */
  private setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  /** Tente de récupérer le refreshToken, tente de refresh(), si succes set isAuthenticated to true */ 
  public async loadUser(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();
  
    if (!refreshToken || !accessToken) {
      this.logout();
    } else {
      const res = await firstValueFrom(this.refresh({ refreshToken: refreshToken }));
      if ( res.isSuccess && res.isSuccess === true) {
        this.isLoggedIn.set(true);
      } else {
        this.logout();
      }
    }
  }
}

 