import { Injectable } from '@angular/core';
import { ThemeKey, ThemeOptions } from '../models/theme-consts';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme!: ThemeOptions;

  private themeKey = ThemeKey;

  /** Load le theme */
  public loadTheme(): void {
    const theme = localStorage.getItem(this.themeKey);
    if (theme && (theme === ThemeOptions.DARK || theme === ThemeOptions.LIGHT)) {
      this.setCurrenTheme(theme);
    } else {
      this.setCurrenTheme(ThemeOptions.DARK);
    }
  }

  /** Set le currenttheme et le stock dans le localstorage */
  public setCurrenTheme(theme: ThemeOptions) {
    const body = document.body;
    if(!body.classList.contains(theme)) {
      const classToRemove = theme === ThemeOptions.DARK ? ThemeOptions.LIGHT : ThemeOptions.DARK;
      body.classList.remove(classToRemove);
      body.classList.add(theme);
    }
    this.currentTheme = theme;
    localStorage.setItem(this.themeKey, this.currentTheme);
    return;
  }
  
  /** Get le current theme */
  public getCurrentTheme() {
    return this.currentTheme;
  }
}
