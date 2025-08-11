import { ChangeDetectionStrategy, Component, inject, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MenuItemResponse, SettingsResponse } from '../services/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

type ThemeId = 'rose-red' | 'azure-blue' | 'magenta-violet' | 'cyan-orange';

interface Theme {
  id: ThemeId;
  name: string;
  primary: string;
  swatch: {
    background: string;
    primary: string;
  };
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
    FormsModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly languageService = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  
  constructor(@Inject(DOCUMENT) private document: Document) {
    const initialSettings = this.route.snapshot.data['settings'] as SettingsResponse;
    if (initialSettings) {
      const initialTheme: ThemeId = initialSettings.theme === 'dark' ? 'magenta-violet' : 'cyan-orange';
      this.setTheme(initialTheme);
    }
  }

  private readonly data$ = this.route.data;
  protected readonly settings = toSignal(this.data$.pipe(map(d => d['settings'] as SettingsResponse)));
  protected readonly menuItems = toSignal(this.data$.pipe(map(d => d['menu'] as MenuItemResponse[])));
  
  protected readonly theme = signal<ThemeId>('cyan-orange');
  protected readonly availableThemes: Theme[] = [
    { id: 'rose-red', name: 'Rose & Red', primary: '#d32f2f', swatch: { background: '#ffffff', primary: '#ffcdd2' } },
    { id: 'azure-blue', name: 'Azure & Blue', primary: '#1976d2', swatch: { background: '#ffffff', primary: '#bbdefb' } },
    { id: 'magenta-violet', name: 'Magenta & Violet', primary: '#7b1fa2', swatch: { background: '#ffffff', primary: '#e1bee7' } },
    { id: 'cyan-orange', name: 'Cyan & Orange', primary: '#388e3c', swatch: { background: '#ffffff', primary: '#c8e6c9' } }
  ];

  protected readonly lang = this.languageService.language;
  protected readonly localizedTitle = computed(() => {
    const s = this.settings();
    const l = this.lang();
    return s ? s.title[l] : '';
  });

  protected switchLanguage(lang: 'sk' | 'en') {
    this.languageService.switchLanguage(lang);
    this.translate.use(lang);
  }

  protected setTheme(themeId: ThemeId) {
    console.log('Setting theme to:', themeId);
    this.theme.set(themeId);
    this.applyTheme(themeId);
  }

  private applyTheme(themeId: ThemeId) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const body = this.document.body;
    const html = this.document.documentElement;
    
    // Remove all existing theme classes
    this.availableThemes.forEach(t => {
      body.classList.remove(`${t.id}-theme`);
      html.classList.remove(`${t.id}-theme`);
    });
    
    // Add new theme class
    body.classList.add(`${themeId}-theme`);
    html.classList.add(`${themeId}-theme`);
    
    // Force update CSS variables directly
    const selectedTheme = this.availableThemes.find(t => t.id === themeId);
    if (selectedTheme) {
      html.style.setProperty('--mdc-theme-primary', selectedTheme.primary);
      html.style.setProperty('--mat-toolbar-background-color', selectedTheme.primary);
      html.style.setProperty('--md-sys-color-primary', selectedTheme.primary);
      
      console.log('Applied theme:', themeId, 'with color:', selectedTheme.primary);
    }
  }
}


