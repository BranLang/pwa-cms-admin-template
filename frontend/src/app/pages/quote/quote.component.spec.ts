import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteComponent } from './quote.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

describe('QuoteComponent', () => {
  let component: QuoteComponent;
  let fixture: ComponentFixture<QuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteComponent, NoopAnimationsModule, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.quoteForm.valid).toBeFalsy();
  });

  it('should have a valid form when filled', () => {
    component.quoteForm.controls['name'].setValue('Test Name');
    component.quoteForm.controls['email'].setValue('test@example.com');
    component.quoteForm.controls['productType'].setValue('drevene-okna');
    component.quoteForm.controls['message'].setValue('Test message');
    expect(component.quoteForm.valid).toBeTruthy();
  });
});
