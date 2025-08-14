import { Injectable, signal, inject, PLATFORM_ID, RendererFactory2, Renderer2 } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
  primaryColor: string;
  tertiaryColor: string;
  isDark: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly rendererFactory = inject(RendererFactory2);
  private renderer: Renderer2;
  private readonly localStorage: Storage | undefined;

  private readonly themes: ThemeOption[] = [
    {
      id: 'rose-red',
      name: 'Rose & Red',
      description: 'Rose primary with red tertiary',
      primaryColor: 'rose',
      tertiaryColor: 'red',
      isDark: true
    },
    {
      id: 'azure-blue',
      name: 'Azure & Blue',
      description: 'Blue primary with blue tertiary',
      primaryColor: 'blue',
      tertiaryColor: 'blue',
      isDark: false
    },
    {
      id: 'magenta-violet',
      name: 'Magenta & Violet',
      description: 'Magenta primary with violet tertiary',
      primaryColor: 'magenta',
      tertiaryColor: 'violet',
      isDark: false
    },
    {
      id: 'cyan-orange',
      name: 'Cyan & Orange',
      description: 'Cyan primary with orange tertiary',
      primaryColor: 'cyan',
      tertiaryColor: 'orange',
      isDark: false
    },
  ];

  public readonly currentTheme = signal<string>('magenta-violet');
  public readonly availableThemes = signal<ThemeOption[]>(this.themes);

  constructor() {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = window.localStorage;
      const savedTheme = this.localStorage?.getItem('theme') || 'magenta-violet';
      this.setTheme(savedTheme);
    }
  }

  setTheme(themeId: string): void {
    const theme = this.themes.find(t => t.id === themeId);
    if (theme) {
      this.currentTheme.set(themeId);
      if (isPlatformBrowser(this.platformId)) {
        this.localStorage?.setItem('theme', themeId);
        // Remove previous theme classes
        this.themes.forEach(t => this.renderer.removeClass(this.document.documentElement, t.id));
        // Add new theme class
        this.renderer.addClass(this.document.documentElement, themeId);
      }
    } else {
      console.warn('ThemeService: Invalid theme ID:', themeId);
    }
  }
}
