import { Injectable, signal, effect, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  seedColor: string;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly localStorage: Storage | undefined;

  // M3 themes
  private readonly themes: ThemeOption[] = [
    { id: 'rose-red', name: 'Rose & Red', description: 'Seeded dark', seedColor: '#e91e63', isDark: true },
    { id: 'azure-blue', name: 'Azure & Blue', description: 'Seeded light', seedColor: '#1976d2', isDark: false },
    { id: 'magenta-violet', name: 'Magenta & Violet', description: 'Seeded dark', seedColor: '#9c27b0', isDark: true },
    { id: 'cyan-orange', name: 'Cyan & Orange', description: 'Seeded light', seedColor: '#00bcd4', isDark: false },
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
    const head = this.document.getElementsByTagName('head')[0];
    const themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `${themeId}.css`;
    } else {
      const style = this.document.createElement('link');
      style.id = 'app-theme';
      style.rel = 'stylesheet';
      style.href = `${themeId}.css`;
      head.appendChild(style);
    }
  }
}
