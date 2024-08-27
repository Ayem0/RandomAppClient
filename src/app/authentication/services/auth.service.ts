import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { AccessTokenKey, RefreshTokenKey } from '../models/auth-const';
import { LoginRequest, RegisterRequest, ConfirmEmailRequest, RefreshRequest, ForgotPasswordRequest, ResetPasswordRequest, ResendConfirmEmailRequest } from '../models/auth-request-interface';
import { LoginResponse, RegisterResponse, ConfirmEmailResponse, RefreshResponse, Response, ForgotPasswordResponse, ResetPasswordResponse, ResendConfirmEmailResponse } from '../models/auth-response-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  // TODO a mettre dans environement
  private readonly authUrl = "https://localhost:7195/Auth";

  private readonly accessTokenKey = AccessTokenKey;
  private readonly refreshTokenKey = RefreshTokenKey;

  private isLoggedIn = new BehaviorSubject<boolean>(false);
  public $isLoggedIn = this.isLoggedIn.asObservable();

  /** Requete pour se connecter, si la connexion a fonctionné return true sinon return false et les erreurs */
  public login(loginRequest: LoginRequest): Observable<Partial<Response>> {
    return this.http.post<LoginResponse>(`${this.authUrl}/Login`, loginRequest, { observe: 'response' }).pipe(
      map((res: HttpResponse<Partial<LoginResponse>>) => {
        if (res.status === 200 && res.body && res.body.accessToken && res.body.refreshToken) {
          this.setAccessToken(res.body.accessToken);
          this.setRefreshToken(res.body.refreshToken);
          // this.isLoggedIn.set(true);
          this.isLoggedIn.next(true);
          return { isSuccess: true };
        } else {
          // this.isLoggedIn.set(false);
          return { isSuccess: false, errors: res.body && res.body.errors ? res.body.errors : ['Unknown error occurred'] };
        }
      }),
      catchError((err: HttpErrorResponse) => {
        // this.isLoggedIn.set(false);
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

  /** TODO mettre un blase */
  public resendConfirmEmail(resendConfirmEmailRequest: ResendConfirmEmailRequest): Observable<Partial<ResendConfirmEmailResponse>> {
    return this.http.post<ResendConfirmEmailResponse>(`${this.authUrl}/ResendConfirmEmail`, resendConfirmEmailRequest, {observe: "response"}).pipe(
      map((res: HttpResponse<Partial<ResendConfirmEmailResponse>>) => {
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

  /** Remove access et refresh tokens du localstorage, met isLoggedIn a false */
  public logout() {
    localStorage.removeItem(AccessTokenKey);
    localStorage.removeItem(RefreshTokenKey);
    this.isLoggedIn.next(false);
  }

  /** Refresh les tokens avec le refreshtoken */
  public refresh(refreshRequest: RefreshRequest): Observable<boolean> {
    return this.http.post<RefreshResponse>(`${this.authUrl}/Refresh`, refreshRequest, { observe: 'response' }).pipe(
      map((res: HttpResponse<Partial<RefreshResponse>>) => {
        if (res.status === 200 && res.body && res.body.accessToken && res.body.refreshToken) {
          this.setAccessToken(res.body.accessToken);
          this.setRefreshToken(res.body.refreshToken);
          return true;
        } else {
          return false;
        }
      }),
      catchError(() => {
        return of(false);
      })
    );
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

  /** Redirige les utilisateurs non connectés vers la login page */ 
  public async checkingForAuth(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    if (this.isLoggedIn.getValue() === true && accessToken && refreshToken) {
      return true;
    } else if (refreshToken && accessToken) {
      const res = await firstValueFrom(this.refresh({refreshToken}));
      if (res) {
        this.isLoggedIn.next(true);
        return true;
      } else {
        this.logout();
        this.router.navigateByUrl("/login");
        return false;
      }
    } else {
      this.logout();
      this.router.navigateByUrl("/login");
      return false;
    }
  }

  /** Redirige les utilisateurs connectés vers la home page */
  public async checkingForNotAuth(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    const accessToken = this.getAccessToken();

    if (this.isLoggedIn.getValue() === true && accessToken && refreshToken) {
      this.router.navigateByUrl("/home");
      return false;
    } else if (refreshToken && accessToken) {
      const res = await firstValueFrom(this.refresh({refreshToken}));
      if (res) {
        this.isLoggedIn.next(true);
        this.router.navigateByUrl("/home");
        return false;
      } else {
        this.logout();
        return true;
      }
    } else {
      this.logout();
      return true;
    }
  }

  /** TODO mettre un nom */
  public forgotPassword(forgotPasswordRequest: ForgotPasswordRequest): Observable<Partial<ForgotPasswordResponse>> {
    return this.http.post<ForgotPasswordResponse>(`${this.authUrl}/ForgotPassword`, forgotPasswordRequest, {observe: "response"}).pipe(
      map((res: HttpResponse<Partial<ForgotPasswordResponse>>) => {
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

  /** TODO mettre un nom */
  public resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<Partial<ResetPasswordResponse>> {
    const params = new HttpParams()
    .set('email', resetPasswordRequest.email)
    .set('token', resetPasswordRequest.token)
    .set('password', resetPasswordRequest.password)
    .set('confirmPassword', resetPasswordRequest.confirmPassword);

    return this.http.get<Response>(`${this.authUrl}/ResetPassword`, { params: params, observe: "response" }).pipe(
      map((res: HttpResponse<Partial<ResetPasswordResponse>> ) => {
        if (res.status === 200) {
          return { isSuccess: true };
        } else {
          return { isSuccess: false, errors: res.body && res.body.errors ? res.body.errors : ['Unknown error occurred'] };
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return of({ isSuccess: false, errors: err.error.errors ? err.error.errors : ['Unknown error occurred'] });
      })
    );
  }

  /** TODO mettre un nom */
  public confirmEmail(confirmEmailRequest: ConfirmEmailRequest): Observable<Partial<ConfirmEmailResponse>> {
    const params = new HttpParams()
    .set('email', confirmEmailRequest.email)
    .set('token', confirmEmailRequest.token)

    return this.http.get<Response>(`${this.authUrl}/ConfirmEmail`, { params: params, observe: "response" }).pipe(
      map((res: HttpResponse<Partial<ConfirmEmailResponse>> ) => {
        if (res.status === 200) {
          return { isSuccess: true };
        } else {
          return { isSuccess: false, errors: res.body && res.body.errors ? res.body.errors : ['Unknown error occurred'] };
        }
      }),
      catchError((err: HttpErrorResponse) => {
        return of({ isSuccess: false, errors: err.error.errors ? err.error.errors : ['Unknown error occurred'] });
      })
    );
  }
}

 