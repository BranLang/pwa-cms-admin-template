import { Injectable, effect, signal, inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageCode } from './api.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly translate = inject(TranslateService);
  private readonly localStorage = isPlatformBrowser(this.platformId) ? window.localStorage : undefined;

  private readonly currentLanguage = signal<LanguageCode>(this.getInitialLanguage());

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
        this.localStorage?.setItem('language', lang);
      }
    });
  }

  get language() {
    return this.currentLanguage.asReadonly();
  }

  switchLanguage(lang: LanguageCode) {
    this.currentLanguage.set(lang);
  }

  private getInitialLanguage(): LanguageCode {
    if (!isPlatformBrowser(this.platformId)) {
      return 'sk';
    }
    const storedLang = this.localStorage?.getItem('language');
    if (storedLang === 'sk' || storedLang === 'en') {
      return storedLang;
    }
    const browserLang = this.translate.getBrowserLang();
    if (browserLang === 'sk' || browserLang === 'en') {
      return browserLang;
    }
    return 'sk';
  }
}


