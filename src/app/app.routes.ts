import { Routes } from '@angular/router';
import { LoginComponent } from './authentication/components/login/login.component';
import { RegisterComponent } from './authentication/components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './authentication/auth.guard';

export const routes: Routes = [
    { path: "home", component: HomeComponent, title: "Home", canActivate: [authGuard]},
    { path: "login", component: LoginComponent, title: "Login"},
    { path: "register", component: RegisterComponent, title: "Register" },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent, title: "Page not found"}
];
