import { ChangeDetectionStrategy, Component, inject, signal, computed, PLATFORM_ID } from '@angular/core';
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

export interface ThemeOption {
  id: string;
  name: string;
  swatch: { background: string; primary: string };
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
  private readonly document = inject(DOCUMENT);
  private readonly localStorage = this.document.defaultView?.localStorage;
  
  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const storedTheme = this.localStorage?.getItem('theme');
      if (storedTheme) {
        this.setTheme(storedTheme);
      } else {
        const initialSettings = this.route.snapshot.data['settings'] as SettingsResponse;
        if (initialSettings) {
          const initialTheme: string = initialSettings.theme === 'dark' ? 'magenta-theme' : 'cyan-orange-theme';
          this.setTheme(initialTheme);
        }
      }
    }
  }

  private readonly data$ = this.route.data;
  protected readonly settings = toSignal(this.data$.pipe(map(d => d['settings'] as SettingsResponse)));
  protected readonly menuItems = toSignal(this.data$.pipe(map(d => d['menu'] as MenuItemResponse[])));
  
  protected readonly theme = signal<string>('cyan-orange-theme');
  protected readonly availableThemes: ThemeOption[] = [
    { id: 'cyan-orange-theme', name: 'Cyan & Orange', swatch: { background: '#E0F7FA', primary: '#0097A7' } },
    { id: 'magenta-theme', name: 'Magenta & Violet', swatch: { background: '#F3E5F5', primary: '#7B1FA2' } },
    { id: 'deeppurple-amber-theme', name: 'Deep Purple & Amber', swatch: { background: '#EDE7F6', primary: '#512DA8' } },
    { id: 'pink-bluegrey-theme', name: 'Pink & Blue-grey', swatch: { background: '#FCE4EC', primary: '#C2185B' } },
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

  protected setTheme(themeId: string) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    
    this.theme.set(themeId);
    const body = this.document.body;
    
    // Remove all theme classes
    this.availableThemes.forEach(t => {
      body.classList.remove(t.id);
    });
    
    // Add the new theme class
    body.classList.add(themeId);
    this.localStorage?.setItem('theme', themeId);
  }

  protected trackById = (_: number, o: ThemeOption) => o.id;
}


