import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItemResponse } from '../../services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="column">
          <h4>{{ 'menu.products' | translate }}</h4>
          <ul>
            @for (category of productCategories$ | async; track category.id) {
              <li><a [routerLink]="[category.path]">{{ category.i18nKey | translate }}</a></li>
            }
          </ul>
        </div>
        <div class="column">
          <h4>{{ 'menu.contact' | translate }}</h4>
          <p>JUST SK, s.r.o.</p>
          <p>Viničná 609</p>
          <p>951 71 Sľažany</p>
          <p>Slovensko</p>
          <p>IČO: 36736449</p>
          <p>DIČ: SK2022323160</p>
          <p>Pavol Just, konateľ: 0905 431 240</p>
        </div>
        <div class="column">
          <h4>{{ 'menu.about' | translate }}</h4>
          <p>{{ 'about.snippet' | translate }}</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--surface-color);
      color: var(--text-color);
      padding: 2rem 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    .column h4 {
      color: var(--primary-color);
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    li {
      margin-bottom: 0.5rem;
    }
    a {
      text-decoration: none;
      color: var(--text-color);
      &:hover {
        color: var(--primary-color);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  private readonly route = inject(ActivatedRoute);

  protected readonly productCategories$: Observable<MenuItemResponse[]> = this.route.root.firstChild!.data.pipe(
    map(d => d['menu']),
    map(menu => {
      const productsMenu = menu.find((item: MenuItemResponse) => item.id === 'products');
      return productsMenu ? productsMenu.children || [] : [];
    })
  );
}
