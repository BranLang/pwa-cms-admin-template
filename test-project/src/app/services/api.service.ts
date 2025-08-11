import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export type LanguageCode = 'sk' | 'en';

export interface LocalizedText {
  sk: string;
  en: string;
}

export interface SettingsResponse {
  languages: LanguageCode[];
  title: LocalizedText;
  theme: 'light' | 'dark';
}

export interface MenuItemResponse {
  id: string;
  path: string;
  label?: LocalizedText;
  i18nKey?: string;
  children?: MenuItemResponse[];
}

export interface HomeCarouselItemResponse {
  id: number;
  src: string;
  alt: LocalizedText;
  caption: LocalizedText;
  width: number;
  height: number;
}

export interface HomeCategory {
  id: string;
  title?: LocalizedText;
  description?: LocalizedText;
  i18nKeyTitle?: string;
  i18nKeyDescription?: string;
  image: string;
  width: number;
  height: number;
}

export interface HomeResponse {
  carousel: HomeCarouselItemResponse[];
  categories: HomeCategory[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly baseUrl = '/api';
  private readonly http = inject(HttpClient);

  getSettings() {
    return this.http.get<SettingsResponse>(`${this.baseUrl}/settings`);
  }

  getMenu() {
    return this.http.get<MenuItemResponse[]>(`${this.baseUrl}/menu`);
  }

  getHome() {
    return this.http.get<HomeResponse>(`${this.baseUrl}/home`);
  }
}


