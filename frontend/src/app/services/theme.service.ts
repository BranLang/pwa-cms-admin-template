import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  accentColor: string;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly localStorage: Storage | undefined;

  // Official Angular Material prebuilt themes
  private readonly themes: ThemeOption[] = [
    { id: 'rose-red', name: 'Rose & Red', description: 'Seeded dark', primaryColor: '#e91e63', accentColor: '#f44336', isDark: true },
    { id: 'azure-blue', name: 'Azure & Blue', description: 'Seeded light', primaryColor: '#1976d2', accentColor: '#2196f3', isDark: false },
    { id: 'magenta-violet', name: 'Magenta & Violet', description: 'Seeded dark', primaryColor: '#9c27b0', accentColor: '#7c4dff', isDark: true },
    { id: 'cyan-orange', name: 'Cyan & Orange', description: 'Seeded light', primaryColor: '#00bcd4', accentColor: '#ff9800', isDark: false },
  ];

  // Reactive theme state
  public readonly currentTheme = signal<string>('azure-blue');
  public readonly availableThemes = signal<ThemeOption[]>(this.themes);
  public readonly currentThemeData = signal<ThemeOption>(this.themes[0]);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = window.localStorage;
      
      // Load saved theme from localStorage
      const savedTheme = this.localStorage?.getItem('theme') || 'indigo-pink';
      this.setTheme(savedTheme);
    }

    // Effect to update current theme data when theme changes
    effect(() => {
      const themeId = this.currentTheme();
      const themeData = this.themes.find(t => t.id === themeId) || this.themes[0];
      this.currentThemeData.set(themeData);
      console.log('🎨 Theme service - theme changed to:', themeId, themeData);
    });

    // Effect to apply theme to DOM when theme changes
    effect(() => {
      if (isPlatformBrowser(this.platformId)) {
        const themeId = this.currentTheme();
        this.applyThemeToDom(themeId);
      }
    });
  }

  /**
   * Set the current theme
   */
  setTheme(themeId: string): void {
    if (this.themes.some(t => t.id === themeId)) {
      console.log('🎨 ThemeService.setTheme called with:', themeId);
      this.currentTheme.set(themeId);
      
      // Save to localStorage
      if (isPlatformBrowser(this.platformId)) {
        this.localStorage?.setItem('theme', themeId);
      }
    } else {
      console.warn('🎨 ThemeService: Invalid theme ID:', themeId);
    }
  }

  /**
   * Get theme by ID
   */
  getTheme(themeId: string): ThemeOption | undefined {
    return this.themes.find(t => t.id === themeId);
  }

  /**
   * Apply theme to DOM
   */
  private applyThemeToDom(themeId: string): void {
    const html = this.document.documentElement;
    // Remove, then apply to html only (styles are bound to html[data-theme])
    html.removeAttribute('data-theme');
    html.setAttribute('data-theme', themeId);

    console.log('🎨 Theme applied to DOM:', {
      themeId,
      htmlAttribute: html.getAttribute('data-theme'),
    });
  }
}
