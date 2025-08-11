import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService, HomeResponse } from './api.service';

@Injectable({ providedIn: 'root' })
export class HomeService {
  private readonly api = inject(ApiService);

  getHomeData(): Observable<HomeResponse> {
    return this.api.getHome();
  }
}
