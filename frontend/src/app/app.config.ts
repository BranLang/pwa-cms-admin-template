import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataService } from './mock/mock-data.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';

// Custom loader that fetches translations from public/i18n folder
export class CustomTranslateLoader implements TranslateLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string): Observable<Record<string, string | Record<string, string>>> {
    return this.http.get(`/i18n/${lang}.json`) as Observable<Record<string, string | Record<string, string>>>;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([])),
    provideClientHydration(withEventReplay()),
    // Proper Angular Material animations
    provideAnimations(),
    importProvidersFrom(
      // The `environment` file is not used to simplify the setup.
      // The In-Memory Web API is enabled by default for this template.
      InMemoryWebApiModule.forRoot(MockDataService, {
        delay: 100,
        passThruUnknownUrl: true,
      })
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'sk',
        loader: {
          provide: TranslateLoader,
          useClass: CustomTranslateLoader,
          deps: [HttpClient],
        },
      })
    ),
    provideAnimationsAsync(),
  ],
};
