import { ChangeDetectionStrategy, Component, inject, signal, computed, PLATFORM_ID, OnInit } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MenuItemResponse, SettingsResponse, HomeResponse } from '../services/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

export interface ThemeOption {
  id: string;
  name: string;
  description: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly languageService = inject(LanguageService);

  private readonly localStorage: Storage | undefined;

  protected readonly settings = signal<SettingsResponse | undefined>(undefined);
  protected readonly menuItems = signal<MenuItemResponse[]>([]);
  protected readonly theme = signal<string>('blue-orange');
  protected readonly availableThemes: ThemeOption[] = [
    { id: 'blue-orange', name: 'Blue & Orange', description: 'Blue primary with orange accent' },
    { id: 'blue-red', name: 'Blue & Red', description: 'Blue primary with red accent' },
    { id: 'green-blue', name: 'Green & Blue', description: 'Green primary with blue accent' },
    { id: 'red-orange', name: 'Red & Orange', description: 'Red primary with orange accent' },
  ];

  protected readonly localizedTitle = computed(() => {
    const title = this.settings()?.title;
    if (title && typeof title === 'object') {
      const currentLang = this.languageService.language();
      return title[currentLang] || title['sk'] || '';
    }
    return '';
  });

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage = window.localStorage;
    }
  }

  ngOnInit(): void {
    console.log('🏗️ LayoutComponent ngOnInit - starting data subscription');
    this.activatedRoute.data.subscribe(data => {
      console.log('📦 Layout route data received:', data);
      const settings = data['settings'] as SettingsResponse;
      const menu = data['menu'] as MenuItemResponse[];
      const home = data['home'] as HomeResponse;

      console.log('🔍 Settings data:', settings);
      console.log('🔍 Menu data:', menu);
      console.log('🔍 Home data:', home);

      if (settings) {
        this.settings.set(settings);
        this.translate.setDefaultLang(settings.languages[0]);
        this.translate.use(this.localStorage?.getItem('lang') || settings.languages[0]);
        this.setTheme(this.localStorage?.getItem('theme') || settings.theme);
        console.log('✅ Settings data loaded and applied:', settings);
      } else {
        console.warn('❌ No settings data found in layout route data.');
      }

      if (menu && menu.length > 0) {
        this.menuItems.set(menu);
        console.log('✅ Menu data loaded successfully:', menu);
        console.log('✅ Menu items count:', menu.length);
        console.log('✅ First menu item:', menu[0]);
      } else {
        console.warn('❌ No menu data found in layout route data or menu is empty.');
        console.warn('❌ Menu data type:', typeof menu);
        console.warn('❌ Menu data length:', menu?.length);
      }

      if (home) {
        console.log('✅ Home data found in layout route data (parent):', home);
      } else {
        console.warn('❌ No home data found in layout route data (parent).');
      }
    });
  }

  protected setTheme(themeId: string) {
    this.theme.set(themeId);
    const html = this.document.documentElement;
    const body = this.document.body;

    html.removeAttribute('data-theme');
    body.removeAttribute('data-theme');

    if (themeId !== 'blue-orange') {
      html.setAttribute('data-theme', themeId);
      body.setAttribute('data-theme', themeId);
    }
    this.localStorage?.setItem('theme', themeId);
  }

  protected switchLanguage(lang: 'sk' | 'en') {
    this.languageService.switchLanguage(lang);
    this.translate.use(lang);
  }

  protected trackById(index: number, item: ThemeOption | MenuItemResponse): string | number {
    return item.id;
  }
}



