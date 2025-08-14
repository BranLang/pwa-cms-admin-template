import { ChangeDetectionStrategy, Component, inject, signal, computed, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MenuItemResponse, SettingsResponse } from '../services/api.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { ThemeService, ThemeOption } from '../services/theme.service';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav } from '@angular/material/sidenav';

import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    TranslateModule,
    FooterComponent,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly translate = inject(TranslateService);
  private readonly languageService = inject(LanguageService);
  private readonly themeService = inject(ThemeService);

  @ViewChild('drawer') drawer!: MatSidenav;

  protected readonly settings = signal<SettingsResponse | undefined>(undefined);
  protected readonly menuItems = signal<MenuItemResponse[]>([]);

  // Use theme service for reactive theme management
  protected readonly theme = this.themeService.currentTheme;
  protected readonly availableThemes = this.themeService.availableThemes;

  protected readonly localizedTitle = computed(() => {
    const title = this.settings()?.title;
    if (title && typeof title === 'object') {
      const currentLang = this.languageService.language();
      return title[currentLang] || title['sk'] || '';
    }
    return '';
  });

  constructor() {
    // Theme service handles all theme management
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      const settings = data['settings'] as SettingsResponse;
      const menu = data['menu'] as MenuItemResponse[];

      if (settings) {
        this.settings.set(settings);
        this.translate.setDefaultLang(settings.languages[0]);
        this.translate.use(settings.languages[0]);
      }

      if (menu && menu.length > 0) {
        this.menuItems.set(menu);
      }
    });
  }

  public setTheme(themeId: string) {
    this.themeService.setTheme(themeId);
  }

  protected switchLanguage(lang: 'sk' | 'en') {
    this.languageService.switchLanguage(lang);
    this.translate.use(lang);
  }

  public trackById(index: number, item: ThemeOption | MenuItemResponse): string | number {
    return item.id;
  }

  toggleDrawer() {
    if (this.drawer) {
      this.drawer.toggle();
    }
  }
}



