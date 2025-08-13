import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '../../services/language.service';
import '@material/web/card/outlined-card.js';

interface Article {
  id: string;
  title: { sk: string; en: string };
  snippet: { sk: string; en: string };
  image: string;
  width: number;
  height: number;
}

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, TranslateModule, NgOptimizedImage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="articles-page">
      <h1>{{ 'menu.articles' | translate }}</h1>

      <div class="article-list">
        @for (article of articles$ | async; track article.id) {
          <md-outlined-card>
            <img [ngSrc]="article.image" [width]="article.width" [height]="article.height" [alt]="article.title[lang()]" />
            <div class="card-content">
              <h3>{{ article.title[lang()] }}</h3>
              <p>{{ article.snippet[lang()] }}</p>
            </div>
          </md-outlined-card>
        }
      </div>
    </div>
  `,
  styles: [`
    .articles-page {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .article-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    .card-content {
      padding: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);

  protected readonly lang = this.languageService.language;
  protected readonly articles$: Observable<Article[]> = this.http.get<Article[]>('api/articles');
}
