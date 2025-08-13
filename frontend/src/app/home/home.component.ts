import { ChangeDetectionStrategy, Component, inject, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { ActivatedRoute } from '@angular/router';
import { HomeResponse } from '../services/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly languageService = inject(LanguageService);
  
  // Get data from parent route (layout component) - this is the key fix
  protected readonly data$: Observable<HomeResponse> = this.route.parent!.data.pipe(
    map(d => d['home']),
    tap(data => {
      console.log('🔍 Home data loaded from parent route:', data);
      if (!data) {
        console.warn('⚠️ No home data found in parent route');
        console.log('🔍 Parent route data:', this.route.parent?.snapshot.data);
        console.log('🔍 Current route data:', this.route.snapshot.data);
      } else {
        console.log('✅ Home data loaded successfully:', data);
        console.log('🎠 Carousel items:', data.carousel?.length || 0);
        console.log('🏷️ Category items:', data.categories?.length || 0);
      }
    })
  );
  
  protected readonly lang = this.languageService.language;

  ngOnInit() {
    console.log('🏠 HomeComponent initialized');
    console.log('🔍 Route parent:', this.route.parent);
    console.log('🔍 Route parent data:', this.route.parent?.snapshot.data);
  }

  public trackById<T extends { id?: string | number }>(index: number, item: T): string | number {
    return item?.id ?? index;
  }
}


