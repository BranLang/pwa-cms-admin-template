import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuTestComponent } from './menu-test.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MenuTestComponent', () => {
  let component: MenuTestComponent;
  let fixture: ComponentFixture<MenuTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTestComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu when button is clicked', () => {
    spyOn(component, 'toggleMenu').and.callThrough();

    const button = fixture.nativeElement.querySelector('md-filled-button');
    button.click();

    expect(component.toggleMenu).toHaveBeenCalled();

    fixture.detectChanges();

    const menu = component.menu.nativeElement;
    expect(menu.open).toBe(true);
  });
});
