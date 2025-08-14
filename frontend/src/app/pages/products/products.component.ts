import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MenuItemResponse } from '../../services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, MatCardModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
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
