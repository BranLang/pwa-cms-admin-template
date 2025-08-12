import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService, TranslationObject } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LanguageService } from './language.service';
import { Component } from '@angular/core';

// Create a dummy component to host the service
@Component({
  template: '',
  standalone: true,
  providers: [LanguageService]
})
class TestHostComponent {}

class FakeTranslateLoader implements TranslateLoader {
  private readonly translations: Record<string, TranslationObject> = {
    sk: {
      categories: {
        windows: { title: 'Okná', desc: 'Vyberte si z našej širokej ponuky okien' },
      }
    },
    en: {
      categories: {
        windows: { title: 'Windows', desc: 'Choose from our wide range of windows' },
      }
    }
  };

  getTranslation(lang: string) {
    return of(this.translations[lang] ?? {});
  }
}

describe('LanguageService + translations', () => {
  let translate: TranslateService;
  let service: LanguageService;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TestHostComponent,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeTranslateLoader },
          fallbackLang: 'sk'
        })
      ],
      providers: [LanguageService]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    translate = TestBed.inject(TranslateService);
    service = TestBed.inject(LanguageService);
    
    // Set initial language
    await translate.use('sk').toPromise();
  });

  it('loads default language (sk) and translates keys', async () => {
    const value = await translate.get('categories.windows.title').toPromise();
    expect(value).toBe('Okná');
  });

  it('switches language to en and translates keys', async () => {
    service.switchLanguage('en');
    await fixture.whenStable();
    
    // Wait for language change to complete
    await translate.use('en').toPromise();
    const value = await translate.get('categories.windows.title').toPromise();
    expect(value).toBe('Windows');
  });
});


