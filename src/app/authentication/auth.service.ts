import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConfirmEmailResponse, LoginResponse, RegisterResponse } from './interfaces/auth-response';
import { ConfirmEmailRequest, LoginRequest, RegisterRequest} from './interfaces/auth-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly authUrl = "https://localhost:7195/Auth";

  public isloggedIn = false;
  public isEmailConfirmed = false;

  public username?: string;
  public userEmail?: string;

  public register(registerRequest: RegisterRequest): Observable<HttpResponse<Partial<RegisterResponse>>>{
    return this.http.post<RegisterResponse>(`${this.authUrl}/Register`, registerRequest, {observe: "response"});
  }

  public login(loginRequest: LoginRequest): Observable<HttpResponse<Partial<LoginResponse>>> {
    return this.http.post<LoginResponse>(`${this.authUrl}/Login`, loginRequest, {observe: "response"});
  }

  public resendConfirmEmail(confirmEmailRequest: ConfirmEmailRequest) {
    return this.http.post<ConfirmEmailResponse>(`${this.authUrl}/ResendConfirmEmail`, confirmEmailRequest, {observe: "response"});
  }
}
