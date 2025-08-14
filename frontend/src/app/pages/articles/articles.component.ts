import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LanguageService } from '../../services/language.service';

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
  imports: [CommonModule, TranslateModule, NgOptimizedImage, MatCardModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent {
  private readonly http = inject(HttpClient);
  private readonly languageService = inject(LanguageService);

  protected readonly lang = this.languageService.language;
  protected readonly articles$: Observable<Article[]> = this.http.get<Article[]>('api/articles');
}
