import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  currentTheme = "dark-theme";

  // TODO mettre le theme dans le localstorage et faire en sorte qu'a l'init de appcomponent cela load le theme ou si pas de theme le dark-theme

  private loadTheme() {
    return;
  }


  public setCurrenTheme(theme: string) {
    const body = document.body;

    if(theme === "dark-theme" && this.currentTheme === "light-theme") {
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      this.currentTheme = theme;
    } else if(theme === "light-theme" && this.currentTheme === "dark-theme") {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      this.currentTheme = "light-theme";
    }
    return;
  }
}
