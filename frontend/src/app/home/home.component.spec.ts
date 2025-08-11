import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HomeComponent } from './home.component';
import { HomeService } from '../services/home.service';
import { LanguageService } from '../services/language.service';
import { provideZonelessChangeDetection } from '@angular/core';

class FakeTranslateLoader implements TranslateLoader {
  getTranslation(lang: string) {
    const data = {
      sk: {
        categories: {
          windows: { title: 'Okná', desc: 'Vyberte si z našej širokej ponuky okien' },
          doors: { title: 'Dvere', desc: 'Bezpečné a štýlové vchodové dvere' },
          projects: { title: 'Realizácie', desc: 'Pozrite si naše referencie' }
        }
      }
    } as const;
    return of((data as any)[lang] ?? {});
  }
}

describe('HomeComponent i18n rendering', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader },
          defaultLanguage: 'sk',
          useDefaultLang: true,
          fallbackLang: 'sk'
        })
      ],
      providers: [
        provideZonelessChangeDetection(),
        LanguageService,
        {
          provide: HomeService,
          useValue: {
            getHomeData: () =>
              of({
                carousel: [],
                categories: [
                  {
                    id: 'windows',
                    i18nKeyTitle: 'categories.windows.title',
                    i18nKeyDescription: 'categories.windows.desc',
                    image: '/uploads/homeblock-drevene-okna.jpg',
                    width: 400,
                    height: 200
                  }
                ]
              })
          }
        }
      ]
    }).compileComponents();
  });

  it('renders translated category title', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('Okná');
  });
});


