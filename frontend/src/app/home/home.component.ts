import { ChangeDetectionStrategy, Component, inject, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { ActivatedRoute } from '@angular/router';
import { HomeResponse } from '../services/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { signal, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly languageService = inject(LanguageService);
  
  protected readonly data$: Observable<HomeResponse> = this.route.parent!.data.pipe(
    map(d => d['home']),
    tap(data => {
      console.log('🔍 Home data loaded from parent route:', data);
      if (!data) {
        console.warn('⚠️ No home data found in parent route');
      } else {
        console.log('✅ Home data loaded successfully:', data);
      }
    })
  );
  
  protected readonly lang = this.languageService.language;
  protected currentImageIndex = signal(0);
  private intervalId: any;

  ngOnInit() {
    this.startAutoplay();
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    this.intervalId = setInterval(() => {
      this.data$.pipe(
        map(data => data.carousel.length),
      ).subscribe(length => {
        this.currentImageIndex.update(i => (i + 1) % length);
      });
    }, 5000);
  }

  stopAutoplay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  selectImage(index: number, length: number) {
    this.currentImageIndex.set((index + length) % length);
    this.stopAutoplay();
    this.startAutoplay();
  }

  public trackById<T extends { id?: string | number }>(index: number, item: T): string | number {
    return item?.id ?? index;
  }
}


