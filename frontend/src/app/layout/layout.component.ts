import { ChangeDetectionStrategy, Component, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
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

  private readonly data$ = this.route.data;
  protected readonly settings = toSignal(this.data$.pipe(map(d => d['settings'] as SettingsResponse)));
  protected readonly menuItems = toSignal(this.data$.pipe(map(d => d['menu'] as MenuItemResponse[])));
  
  protected readonly theme = signal<ThemeId>('cyan-orange');
  protected readonly availableThemes: Theme[] = [
    { id: 'rose-red', name: 'Rose & Red', primary: '#B71C1C', swatch: { background: '#fffbff', primary: '#ffd9e1' } },
    { id: 'azure-blue', name: 'Azure & Blue', primary: '#1565C0', swatch: { background: '#fdfbff', primary: '#d7e3ff' } },
    { id: 'magenta-violet', name: 'Magenta & Violet', primary: '#6A1B9A', swatch: { background: '#1e1a1d', primary: '#810081' } },
    { id: 'cyan-orange', name: 'Cyan & Orange', primary: '#006064', swatch: { background: '#191c1c', primary: '#004f4f' } }
  ];

  protected readonly lang = this.languageService.language;
  protected readonly localizedTitle = computed(() => {
    const s = this.settings();
    const l = this.lang();
    return s ? s.title[l] : '';
  });

  constructor() {
    const initialSettings = this.route.snapshot.data['settings'] as SettingsResponse;
    if (initialSettings) {
      const initialTheme: ThemeId = initialSettings.theme === 'dark' ? 'magenta-violet' : 'cyan-orange';
      this.setTheme(initialTheme);
    }
  }

  protected switchLanguage(lang: 'sk' | 'en') {
    this.languageService.switchLanguage(lang);
    this.translate.use(lang);
  }

  protected setTheme(themeId: ThemeId) {
    this.theme.set(themeId);
    this.applyTheme(themeId);
  }

  private applyTheme(themeId: ThemeId) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const body = document.body;
    this.availableThemes.forEach(t => body.classList.remove(`${t.id}-theme`));
    body.classList.add(`${themeId}-theme`);
    
    const theme = this.availableThemes.find(t => t.id === themeId);
    if(theme) {
      document.documentElement.style.setProperty('--primary-color', theme.primary);
    }
  }
}


