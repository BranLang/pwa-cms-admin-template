import { ChangeDetectionStrategy, Component, inject, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { ActivatedRoute } from '@angular/router';
import { HomeResponse } from '../services/api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

// Define a type for the Swiper custom element
type SwiperContainer = HTMLElement & {
  initialize: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  swiper: any; // Add more specific Swiper instance properties if needed
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit {
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
    
    // Don't initialize Swiper here - wait for view init
  }

  ngAfterViewInit() {
    console.log('🏠 HomeComponent after view init');
    // Wait longer for Swiper to be available
    setTimeout(() => this.initializeSwiper(), 500);
  }

  private initializeSwiper() {
    if (typeof window !== 'undefined') {
      console.log('🎠 Initializing Swiper...');
      
      // Wait for Swiper to be available with a longer timeout
      const checkSwiper = () => {
        const swiperEl = document.querySelector<SwiperContainer>('swiper-container');
        console.log('🔍 Swiper element found:', !!swiperEl);
        
        // Check if Swiper is available in window
        const swiperAvailable = !!window.Swiper;
        console.log('🔍 Window Swiper available:', swiperAvailable);
        
        if (swiperEl && swiperAvailable) {
          console.log('✅ Initializing Swiper with parameters');
          try {
            const swiperParams = {
              slidesPerView: 1,
              spaceBetween: 0,
              centerSlides: true,
              pagination: {
                clickable: true,
              },
              navigation: true,
              loop: true,
              autoplay: {
                delay: 5000,
                disableOnInteraction: false,
              },
              breakpoints: {
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 1,
                },
              },
            };

            Object.assign(swiperEl, swiperParams);
            swiperEl.initialize();
            console.log('✅ Swiper initialized successfully');
          } catch (error) {
            console.error('❌ Error initializing Swiper:', error);
          }
        } else {
          console.log('⏳ Swiper not ready, retrying...');
          // Retry with exponential backoff, max 10 attempts
          if (this.retryCount < 10) {
            this.retryCount++;
            setTimeout(checkSwiper, 200 * this.retryCount);
          } else {
            console.error('❌ Failed to initialize Swiper after 10 attempts');
          }
        }
      };
      
      this.retryCount = 0;
      checkSwiper();
    }
  }

  private retryCount = 0;

  public trackById<T extends { id?: string | number }>(index: number, item: T): string | number {
    return item?.id ?? index;
  }
}


