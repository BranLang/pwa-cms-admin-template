import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HomeResponse } from '../services/api.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let element: HTMLElement;

  const mockHomeData: HomeResponse = {
    carousel: [
      {
        id: 1,
        src: '/uploads/homepage_1-2.jpg',
        alt: { sk: 'Test Alt 1', en: 'Test Alt 1 EN' },
        caption: { sk: 'Test Caption 1', en: 'Test Caption 1 EN' },
        width: 1200,
        height: 400
      }
    ],
    categories: [
      {
        id: 'windows',
        i18nKeyTitle: 'categories.windows.title',
        i18nKeyDescription: 'categories.windows.desc',
        image: '/uploads/homeblock-drevene-okna.jpg',
        width: 1200,
        height: 634
      }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]), 
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              data: of({ home: mockHomeData })
            },
            data: of({ home: mockHomeData })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load home data from route resolver', () => {
    expect(component['data$']).toBeTruthy();
    
    let loadedData: HomeResponse | undefined;
    component['data$'].subscribe(data => {
      loadedData = data;
    });
    
    expect(loadedData).toEqual(mockHomeData);
  });

  it('should display carousel items', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    
    const carouselContainer = element.querySelector('swiper-container');
    expect(carouselContainer).toBeTruthy();
    
    const slides = element.querySelectorAll('swiper-slide');
    expect(slides.length).toBeGreaterThan(0);
  });

  it('should display category cards', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    
    const categoryCards = element.querySelectorAll('.card');
    expect(categoryCards.length).toBeGreaterThan(0);
  });

  it('should have proper image attributes for NgOptimizedImage', async () => {
    fixture.detectChanges();
    await fixture.whenStable();
    
    // NgOptimizedImage transforms [ngSrc] to src at runtime
    const images = element.querySelectorAll('img[src]');
    expect(images.length).toBeGreaterThan(0);
    
    images.forEach(img => {
      expect(img.getAttribute('src')).toBeTruthy();
      expect(img.getAttribute('width')).toBeTruthy();
      expect(img.getAttribute('height')).toBeTruthy();
      // Check for NgOptimizedImage specific attributes
      expect(img.getAttribute('ng-img')).toBe('true');
    });
  });

  it('should track by id', () => {
    const item = { id: 'test-id' };
    expect((component as any).trackById(0, item)).toBe('test-id');
  });
});


