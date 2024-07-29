import { Injectable } from '@angular/core';
import { ThemeKey, ThemeOptions } from './consts/theme-consts';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private currentTheme!: ThemeOptions;

  private themeKey = ThemeKey;

  public loadTheme() {
    const theme = localStorage.getItem(this.themeKey);
    if (theme && (theme === ThemeOptions.DARK || theme === ThemeOptions.LIGHT)) {
      this.setCurrenTheme(theme);
    } else {
      this.setCurrenTheme(ThemeOptions.DARK);
    }
    return;
  }

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
}
