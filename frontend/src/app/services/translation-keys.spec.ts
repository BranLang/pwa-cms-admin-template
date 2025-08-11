import { TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

// Mock data mirroring the JSON structure
const translations = {
  sk: {
    app: { title: 'Windows Propagácia' },
    menu: { home: 'Úvod', contact: 'Kontakt' },
    categories: {
      windows: { title: 'Okná', desc: 'Popis okien' },
      doors: { title: 'Dvere', desc: 'Popis dverí' },
      projects: { title: 'Realizácie', desc: 'Popis realizácií' },
    },
    nav: { theme: 'Téma', language: 'Jazyk' },
    lang: { sk: 'Slovenčina', en: 'Angličtina' },
  },
  en: {
    app: { title: 'Windows Promotion' },
    menu: { home: 'Home', contact: 'Contact' },
    categories: {
      windows: { title: 'Windows', desc: 'Windows description' },
      doors: { title: 'Doors', desc: 'Doors description' },
      projects: { title: 'Projects', desc: 'Projects description' },
    },
    nav: { theme: 'Theme', language: 'Language' },
    lang: { sk: 'Slovak', en: 'English' },
  },
};

// Mock loader for the testing environment
class MockTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of((translations as any)[lang]);
  }
}

function flattenKeys(obj: object, parent = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const fullKey = parent ? `${parent}.${key}` : key;
    if (value && typeof value === 'object') {
      return flattenKeys(value, fullKey);
    }
    return [fullKey];
  });
}

describe('Translations', () => {
  let translate: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: MockTranslateLoader },
        }),
      ],
    }).compileComponents();
    translate = TestBed.inject(TranslateService);
    translate.setDefaultLang('sk');
  });

  it('should have identical key structures in sk and en', () => {
    const skKeys = new Set(flattenKeys(translations.sk));
    const enKeys = new Set(flattenKeys(translations.en));

    const onlyInSk = [...skKeys].filter(k => !enKeys.has(k));
    const onlyInEn = [...enKeys].filter(k => !skKeys.has(k));

    expect(onlyInSk).withContext('Keys found only in sk.json').toEqual([]);
    expect(onlyInEn).withContext('Keys found only in en.json').toEqual([]);
  });

  it('should return correct translation for a key after setting language', async () => {
    await translate.use('en').toPromise();
    const title = await translate.get('categories.windows.title').toPromise();
    expect(title).toBe('Windows');

    await translate.use('sk').toPromise();
    const skTitle = await translate.get('categories.windows.title').toPromise();
    expect(skTitle).toBe('Okná');
  });

  it('should not show raw keys for any defined translation', async () => {
    await translate.use('en').toPromise();
    const skKeys = flattenKeys(translations.sk);
    
    for (const key of skKeys) {
        const translation = await translate.get(key).toPromise();
        expect(translation).not.toBe(key);
        expect(translation).not.toBeFalsy();
    }
  });
});


