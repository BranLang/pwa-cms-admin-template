import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuItemResponse } from '../../services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import '@material/web/card/elevated-card.js';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="products-page">
      <h1>{{ 'menu.products' | translate }}</h1>

      <div class="category-list">
        @for (category of productCategories$ | async; track category.id) {
          <md-elevated-card [routerLink]="[category.path]">
            <div class="card-content">
              <h3>{{ category.i18nKey | translate }}</h3>
            </div>
          </md-elevated-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .products-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .category-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    md-elevated-card {
      cursor: pointer;
    }
    .card-content {
      padding: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly productCategories$: Observable<MenuItemResponse[]> = this.route.parent!.data.pipe(
    map(d => d['menu']),
    map(menu => {
      const productsMenu = menu.find((item: MenuItemResponse) => item.id === 'products');
      return productsMenu ? productsMenu.children || [] : [];
    })
  );
}
