import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { TranslateModule } from '@ngx-translate/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, TranslateModule.forRoot(), NoopAnimationsModule],
      providers: [provideRouter([])]
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
    const themeButtons = element.querySelectorAll('.theme-option');
    expect(themeButtons.length).toBe(4);
  });

  it('should switch theme when a theme option is clicked', () => {
    spyOn(component as any, 'setTheme');
    const themeButton = element.querySelector('.theme-option') as HTMLElement;
    themeButton.click();
    fixture.detectChanges();
    expect((component as any).setTheme).toHaveBeenCalledWith('rose-red');
  });

  it('should apply the correct theme class to the body', () => {
    (component as any).setTheme('azure-blue');
    fixture.detectChanges();
    expect(document.body.classList).toContain('azure-blue-theme');
  });
});
