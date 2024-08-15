import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/pages/login/login.component';
import { ForgotPasswordComponent } from './authentication/pages/forgot-password/forgot-password.component';
import { ConfirmEmailComponent } from './authentication/pages/confirm-email/confirm-email.component';
import { RegisterComponent } from './authentication/pages/register/register.component';
import { PageNotFoundComponent } from './generic-pages/page-not-found/page-not-found.component';
import { HomeComponent } from './generic-pages/home/home.component';
import { loggedInGuard } from './authentication/guards/logged-in.guard';
import { authGuard } from './authentication/guards/auth.guard';

export const routes: Routes = [
    { path: "home", component: HomeComponent, title: "Home", canActivate: [authGuard]},
    { path: "login", component: LoginComponent, title: "Login", canActivate: [loggedInGuard]},
    { path: "register", component: RegisterComponent, title: "Register", canActivate: [loggedInGuard]},
    { path: "forgot-password", component: ForgotPasswordComponent, title: "Forgot password", canActivate: [loggedInGuard]},
    { path: "confirm-email", component: ConfirmEmailComponent, title: "Confirm email", canActivate: [loggedInGuard] },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent, title: "Page not found"}
];
