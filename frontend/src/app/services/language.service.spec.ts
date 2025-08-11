import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LanguageService } from './language.service';
import { provideZonelessChangeDetection } from '@angular/core';

class FakeTranslateLoader implements TranslateLoader {
  private readonly translations = {
    sk: {
      categories: {
        windows: { title: 'Okná', desc: 'Vyberte si z našej širokej ponuky okien' },
        doors: { title: 'Dvere', desc: 'Bezpečné a štýlové vchodové dvere' },
        projects: { title: 'Realizácie', desc: 'Pozrite si naše referencie' }
      }
    },
    en: {
      categories: {
        windows: { title: 'Windows', desc: 'Choose from our wide range of windows' },
        doors: { title: 'Doors', desc: 'Secure and stylish entrance doors' },
        projects: { title: 'Projects', desc: 'See our references' }
      }
    }
  } as const;

  getTranslation(lang: string) {
    // Simulate async loader
    const data = (this.translations as any)[lang] ?? {};
    return of(data);
  }
}

describe('LanguageService + translations', () => {
  let translate: TranslateService;
  let service: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader },
          defaultLanguage: 'sk',
          useDefaultLang: true,
          fallbackLang: 'sk'
        })
      ],
      providers: [provideZonelessChangeDetection(), LanguageService]
    }).compileComponents();

    translate = TestBed.inject(TranslateService);
    service = TestBed.inject(LanguageService);
  });

  it('loads default language (sk) and translates keys', async () => {
    const value = await translate.get('categories.windows.title').toPromise();
    expect(value).toBe('Okná');
  });

  it('switches language to en and translates keys', async () => {
    service.switchLanguage('en');
    const value = await translate.get('categories.windows.title').toPromise();
    expect(value).toBe('Windows');
  });
});


