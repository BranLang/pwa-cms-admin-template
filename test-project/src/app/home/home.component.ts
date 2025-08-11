import { ChangeDetectionStrategy, Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { ActivatedRoute } from '@angular/router';
import { HomeResponse } from '../services/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly languageService = inject(LanguageService);
  
  protected readonly data$: Observable<HomeResponse> = this.route.data.pipe(map(d => d['home']));
  protected readonly lang = this.languageService.language;

  protected trackById<T extends { id?: string | number }>(index: number, item: T): string | number {
    return item?.id ?? index;
  }
}


