import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, TranslateModule.forRoot(), NoopAnimationsModule],
      providers: [
        provideRouter([]), 
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 theme options', () => {
    expect(component['availableThemes'].length).toBe(4);
  });

  it('should have correct theme names', () => {
    const themeNames = component['availableThemes'].map(t => t.name);
    expect(themeNames).toContain('Blue & Orange');
    expect(themeNames).toContain('Blue & Red');
    expect(themeNames).toContain('Green & Blue');
    expect(themeNames).toContain('Red & Orange');
  });

  it('should apply the correct data-theme attribute to html and body', () => {
    // Access protected method through component instance
    component.setTheme('blue-red');
    fixture.detectChanges();
    
    expect(document.documentElement.getAttribute('data-theme')).toBe('blue-red');
    expect(document.body.getAttribute('data-theme')).toBe('blue-red');
  });

  it('should not apply data-theme for default theme', () => {
    // Access protected method through component instance
    component.setTheme('blue-orange');
    fixture.detectChanges();
    
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    expect(document.body.getAttribute('data-theme')).toBeNull();
  });

  it('should track by id', () => {
    const theme = { id: 'test-theme', name: 'Test Theme', description: 'Test' };
    expect(component.trackById(0, theme)).toBe('test-theme');
  });
});
