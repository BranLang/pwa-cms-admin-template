import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  imports: [CommonModule, TranslateModule],
  template: `<h1>{{ 'menu.products' | translate }}</h1>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {}


