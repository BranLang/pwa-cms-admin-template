import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService, HomeResponse } from './api.service';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly api = inject(ApiService);
  private readonly languageService = inject(LanguageService);

  getHomeData(): Observable<HomeResponse> {
    return this.api.getHome().pipe(
      map((data) => ({
        ...data,
        carousel: data.carousel.map((item) => ({
          ...item,
          caption: item.caption[this.languageService.language()],
          alt: item.alt[this.languageService.language()]
        })),
        categories: data.categories.map((item) => ({
          ...item,
          i18nKeyTitle: item.i18nKeyTitle,
          i18nKeyDescription: item.i18nKeyDescription
        }))
      }))
    );
  }
}
