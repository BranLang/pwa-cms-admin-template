import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, TranslateModule.forRoot(), NoopAnimationsModule],
      providers: [provideRouter([]), provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 4 theme options after opening the menu', () => {
    const themeMenuButton = element.querySelector('.theme-toggle') as HTMLElement;
    themeMenuButton.click();
    fixture.detectChanges();

    const themeButtons = document.querySelectorAll('.theme-option');
    expect(themeButtons.length).toBe(4);
  });

  it('should switch theme when a theme option is clicked', () => {
    const setThemeSpy = spyOn(component, 'setTheme');
    
    const themeMenuButton = element.querySelector('.theme-toggle') as HTMLElement;
    themeMenuButton.click();
    fixture.detectChanges();

    const themeButton = document.querySelector('.theme-option') as HTMLElement;
    themeButton.click();
    fixture.detectChanges();
    
    expect(setThemeSpy).toHaveBeenCalledWith('rose-red');
  });

  it('should apply the correct theme class to the body', () => {
    component.setTheme('azure-blue');
    fixture.detectChanges();
    expect(document.body.classList).toContain('azure-blue-theme');
  });

  it('should track by id', () => {
    const theme = { id: 'test-theme', name: 'Test Theme' };
    expect(component.trackById(0, theme)).toBe('test-theme');
  });
});
