import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { Test } from './test';
import { ApiService, HomeResponse, MenuItemResponse, SettingsResponse } from './services/api.service';

export const settingsResolver: ResolveFn<SettingsResponse> = () => {
  return inject(Test).getSettings();
};

export const menuResolver: ResolveFn<MenuItemResponse[]> = () => {
  return inject(ApiService).getMenu();
};

export const homeResolver: ResolveFn<HomeResponse> = () => {
  return inject(ApiService).getHome();
};

export const translationsResolver: ResolveFn<object> = (route: ActivatedRouteSnapshot) => {
  const lang = route.paramMap.get('lang') || 'sk';
  return firstValueFrom(inject(TranslateService).use(lang));
};
