import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsResponse } from './services/api.service';

@Injectable({
  providedIn: 'root'
})
export class Test {
  private readonly baseUrl = '/api';
  private readonly http = inject(HttpClient);

  getSettings() {
    return this.http.get<SettingsResponse>(`${this.baseUrl}/settings`);
  }
}
