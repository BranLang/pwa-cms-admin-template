import { ChangeDetectionStrategy, Component, OnInit, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { ApiService, MenuItemResponse, SettingsResponse } from '../services/api.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-layout',
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
export class LayoutComponent implements OnInit {
  private readonly api = inject(ApiService);
  protected readonly languageService = inject(LanguageService);
  private readonly platformId = inject(PLATFORM_ID);

  protected readonly settings = signal<SettingsResponse | null>(null);
  protected readonly menuItems = signal<MenuItemResponse[]>([]);
  protected readonly theme = signal<'light' | 'dark'>('light');

  protected readonly lang = this.languageService.language;
  protected readonly localizedTitle = computed(() => {
    const s = this.settings();
    const l = this.lang();
    return s ? s.title[l] : '';
  });

  ngOnInit(): void {
    this.api.getSettings().subscribe((s) => {
      this.settings.set(s);
      this.theme.set(s.theme);
      this.applyTheme(s.theme);
    });
    this.api.getMenu().subscribe((items) => this.menuItems.set(items));
  }

  protected switchLanguage(lang: 'sk' | 'en') {
    this.languageService.switchLanguage(lang);
  }

  protected toggleTheme() {
    const next: 'light' | 'dark' = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    this.applyTheme(next);
  }

  private applyTheme(t: 'light' | 'dark') {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(t === 'light' ? 'light-theme' : 'dark-theme');
  }
}


