import { Injectable, effect, signal, inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageCode } from './api.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly currentLanguage = signal<LanguageCode>('sk');
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['sk', 'en']);
    this.translate.setDefaultLang('sk');
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(this.currentLanguage());
    }

    effect(() => {
      const lang = this.currentLanguage();
      if (isPlatformBrowser(this.platformId)) {
        this.translate.use(lang);
        document.documentElement.lang = lang;
      }
    });
  }

  get language() {
    return this.currentLanguage.asReadonly();
  }

  switchLanguage(lang: LanguageCode) {
    this.currentLanguage.set(lang);
  }
}


