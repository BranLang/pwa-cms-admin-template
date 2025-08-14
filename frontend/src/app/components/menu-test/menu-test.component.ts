import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@material/web/button/filled-button.js';
import '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';

@Component({
  selector: 'app-menu-test',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="menu-test-container">
      <md-filled-button (click)="toggleMenu()">Toggle Menu</md-filled-button>
      <md-menu #menu>
        <md-menu-item>
          <div slot="headline">Item 1</div>
        </md-menu-item>
        <md-menu-item>
          <div slot="headline">Item 2</div>
        </md-menu-item>
      </md-menu>
    </div>
  `,
  styles: [`
    .menu-test-container {
      padding: 2rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuTestComponent {
  @ViewChild('menu') menu!: ElementRef<any>;

  toggleMenu() {
    console.log('Toggling menu');
    const menuEl = this.menu.nativeElement;
    if (menuEl) {
      menuEl.open = !menuEl.open;
      console.log('Menu open property set to:', menuEl.open);
    }
  }
}
