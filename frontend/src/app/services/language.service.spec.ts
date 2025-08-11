import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LanguageService } from './language.service';
import { provideZonelessChangeDetection, Component } from '@angular/core';

// Create a dummy component to host the service
@Component({
  template: '',
  standalone: true,
  providers: [LanguageService]
})
class TestHostComponent {}

class FakeTranslateLoader implements TranslateLoader {
  private readonly translations = {
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
  } as const;

  getTranslation(lang: string) {
    return of((this.translations as any)[lang] ?? {});
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
          defaultLanguage: 'sk',
          useDefaultLang: true,
          fallbackLang: 'sk'
        })
      ],
      providers: [provideZonelessChangeDetection(), LanguageService]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    translate = TestBed.inject(TranslateService);
    service = TestBed.inject(LanguageService);
  });

  it('loads default language (sk) and translates keys', async () => {
    const value = await translate.get('categories.windows.title').toPromise();
    expect(value).toBe('Okná');
  });

  it('switches language to en and translates keys', async () => {
    service.switchLanguage('en');
    await fixture.whenStable();
    const value = await translate.get('categories.windows.title').toPromise();
    expect(value).toBe('Windows');
  });
});


