import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection, ErrorHandler, inject, PLATFORM_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { of } from 'rxjs';

import { routes } from './app.routes';
import { MockDataService } from './mock/mock-data.service';

// Custom error handler (optional, but good practice)
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Global Error:', error);
  }
}

// AoT-friendly loader
export function httpTranslateLoaderFactory(http: HttpClient): TranslateLoader {
  const platformId = inject(PLATFORM_ID);
  const isBrowser = isPlatformBrowser(platformId);
  return {
    getTranslation: (lang: string) => isBrowser ? http.get(`/i18n/${lang}.json`) : of({})
  } as TranslateLoader;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimations(),
    provideHttpClient(withFetch()),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(MockDataService, {
        passThruUnknownUrl: true,
        delay: 250
      })
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoaderFactory,
          deps: [HttpClient]
        },
        fallbackLang: 'sk',
        isolate: false
      })
    ),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    // Initialize translation service properly
    {
      provide: 'APP_INITIALIZER',
      useFactory: (translateService: TranslateService) => {
        return () => {
          translateService.setDefaultLang('sk');
          return translateService.use('sk').toPromise();
        };
      },
      deps: [TranslateService],
      multi: true
    }
  ]
};
